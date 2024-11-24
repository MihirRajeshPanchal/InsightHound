/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, FormEvent, useEffect, useRef } from 'react';
import { useAuth } from './use-auth';

interface Message {
    role: 'user' | 'ai';
    content: string;
    url?: string;
}

function convertMarkdownToHtml(markdown: string): string {
    let html = markdown
        .replace(/^### (.+)$/gm, '<h3>$1</h3>') 
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>');

    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    html = html.replace(/_(.*?)_/g, '<em>$1</em>').replace(/\*(.*?)\*/g, '<em>$1</em>');

    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    html = html.replace(/~~~([\s\S]*?)~~~/g, '<pre><code>$1</code></pre>');

    html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

    html = html.replace(/^\s*[-*] (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>'); 

    html = html.replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    html = html.replace(/\\n/g, '<br>');

    return html;
}



export function useChat() {
    const url = process.env.NEXT_PUBLIC_FLASK_URL;
    const apiUrl = `${url}/chat`;
    const { user } = useAuth();
    const messages = useRef<Message[]>([{
        role: 'ai',
        content: 'Hello! How can I assist you today? If you have any questions or need information about your company, competitors, or anything else, feel free to ask!',
    }]);
    const [input, setInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const controller = useRef<AbortController | null>(null);
    
    function setMessages(newMessages: Message[]) {
        messages.current = newMessages;
    }

    const appendMessage = useCallback((message: Message) => {
        setMessages([...messages.current, message]);
    }, []);

    useEffect(() => {
        return () => {
            controller.current?.abort();
        };
    }, []);

    const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim() || !user) return;
    
        const userMessage: Message = { role: 'user', content: input.trim() };
        appendMessage(userMessage);
    
        const aiMessageIndex = messages.current.length;
        appendMessage({ role: 'ai', content: '' });
    
        if (controller.current) controller.current.abort();
        controller.current = new AbortController();
        const signal = controller.current.signal;
    
        try {
            setIsLoading(true);
            setError(null);
    
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input.trim(), user_id: user.id }),
                signal,
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
    
            const text = await response.text();
            const modifiedText = convertMarkdownToHtml(text.slice(1, -1));

    
            const updatedMessages = [...messages.current];
            updatedMessages[aiMessageIndex] = { role: 'ai', content: modifiedText };
            setMessages(updatedMessages);
    
        } catch (err) {
            if (signal.aborted) return;
            setError(err as Error);
        } finally {
            controller.current?.abort();
            controller.current = null;
            setIsLoading(false);
            setInput('');
        }
    }, [input, apiUrl, user, appendMessage]);
    
    return {
        messages,
        input,
        isLoading,
        error,
        setInput,
        handleSubmit,
    };
}
