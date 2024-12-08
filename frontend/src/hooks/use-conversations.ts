import { useQuery } from "@tanstack/react-query"
import { useAuth } from "./use-auth"
import { SidebarConversation } from "@/lib/types/chat"
import { fetchAPI } from "@/lib/utils/fetch-api"

export default function useConversations() {
	const { user } = useAuth()
	const query = useQuery({
		queryKey: ["conversations", user?.companyId],
		queryFn: async () => {
			const res = await fetchAPI<SidebarConversation[]>({
				url: `/sidebar_conversations?user_id=${user?.id}&company_id=${user?.companyId}`,
				method: "GET",
				baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
			})
			return res.data
		},
		enabled: !!user?.companyId,
		staleTime: 0,
	})
	return query
}
