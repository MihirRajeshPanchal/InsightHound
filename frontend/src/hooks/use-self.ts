import { useQuery } from "@tanstack/react-query"
import { useAuth } from "./use-auth"
import { CompanyProfile } from "@/lib/types/chat"
import { fetchAPI } from "@/lib/utils/fetch-api"
import { company } from "@prisma/client"

export default function useSelfCompany() {
	const { user, token } = useAuth()
	const query = useQuery({
		queryKey: ["self-compnay", user?.companyId],
		queryFn: async () => {
			const res = await fetchAPI<company&{props:CompanyProfile}>({
				url: `/company/${user?.companyId}`,
				method: "GET",
                token
			})
			return res.data
		},
		enabled: !!user?.companyId,
		staleTime: 0,
	})
	return query
}
