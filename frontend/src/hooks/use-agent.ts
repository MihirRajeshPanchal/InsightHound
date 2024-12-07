import { Message, MutateConversationBody } from "@/lib/types/chat";
import { TNoParams } from "@/lib/types/common";
import { fetchAPI } from "@/lib/utils/fetch-api";
import { useMutation } from "@tanstack/react-query";

export default function useAgent() {
    const mutation = useMutation({
        mutationKey: ["agent"],
        mutationFn: async ({conversation_id,query}:{query:string, conversation_id: string}) => {
            const response = await fetchAPI<Message[], TNoParams, MutateConversationBody>({
                url: `/agent`,
                method: "POST",
                baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
                body: {
                    conversation_id,
                    query
                },
                isMessage: true
            })
            return response.data
        }
    })

    return mutation
}