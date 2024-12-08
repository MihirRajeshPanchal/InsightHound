import { ActionEnum, Conversation, Message, RoleEnum } from "../types/chat"

function isParseable(m: Message) {
	return (
		m.role === RoleEnum.AI &&
		m.action !== ActionEnum.MAIL_INITIATE &&
		m.action !== ActionEnum.RESPONSE_MD &&
		m.action !== ActionEnum.RESPONSE_MD_PENDING
	)
}
export function parse(data: string) {
	try {
		return JSON.parse(data)
	} catch (e) {
		console.error({ data, e })
		return null
	}
}
export function parseMsg(msg: Message[]): Message[] {
	return msg
		.map((m) => {
			return {
				...m,
				...(isParseable(m)
					? {
							data: parse(m.data.toString()),
							suggestions: parse(m.suggestions.toString()),
						}
					: {}),
			}
		})
		.filter((m) => !isParseable(m) || m.data !== null)
}

export function parseConversation(conversation: Conversation): Conversation {
	return {
		...conversation,
		messages: parseMsg(conversation.messages),
	}
}
