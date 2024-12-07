import { ActionEnum, Conversation, Message, RoleEnum } from "../types/chat";

function parse(data: string) {
    console.log({data})
    try {
        return JSON.parse(data)
    } catch (e) {
        console.error(e)
        return null
    }
}
export function parseMsg(msg: Message[]): Message[] {
    return msg.map((m) => {
        return {
            ...m,
            ...(m.role === RoleEnum.AI && m.action !== ActionEnum.MAIL_INITIATE ? {data: parse(m.data.toString().replace(/'/g, '"'))}: {}),
        }
    }).filter((m) => m.role !== RoleEnum.AI || m.action === ActionEnum.MAIL_INITIATE || m.data !== null)
}

export function parseConversation(conversation: Conversation): Conversation {
    return {
        ...conversation,
        messages: parseMsg(conversation.messages),
    }
}