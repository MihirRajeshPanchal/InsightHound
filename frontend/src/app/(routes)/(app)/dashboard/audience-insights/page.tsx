"use client"
import AudienceInsights from "@/components/custom/audience-insight"
import { useAuth } from "@/hooks/use-auth"
import { KeywordsResponse } from "@/lib/types/api"
import { TNoParams } from "@/lib/types/common"
import { fetchAPI } from "@/lib/utils/fetch-api"
import { useQuery } from "@tanstack/react-query"

export default function Page() {
	const { user } = useAuth()
	const { data } = useQuery({
		queryKey: ["keywords", user?.companyId],
		queryFn: async () => {
			const response = await fetchAPI<KeywordsResponse, TNoParams, { id: string }>({
				url: "/keywords",
				method: "POST",
				body: { id: user?.companyId || "" },
				baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
			})
			return response.data
		},
		enabled: !!user,
	})
	console.log({ data, user })
	return <AudienceInsights keywords={data?.keywords || []} />
}
