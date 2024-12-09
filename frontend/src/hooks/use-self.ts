import { useQuery } from "@tanstack/react-query"
import { useAuth } from "./use-auth"
import { CompanyProfile } from "@/lib/types/chat"
import { fetchAPI } from "@/lib/utils/fetch-api"

export default function useSelfCompany() {
	const { user } = useAuth()
	const query = useQuery({
		queryKey: ["self-compnay", user?.companyId],
		queryFn: async () => {
			const res = await fetchAPI<{ data: CompanyProfile }>({
				url: `/self/details/${user?.companyId}`,
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
