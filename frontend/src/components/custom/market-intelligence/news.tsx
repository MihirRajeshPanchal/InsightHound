import { useAuth } from "@/hooks/use-auth"
// import { sampleNewsResponse } from '@/lib/sample';
import { ArticlesApiResponse } from "@/lib/types/api"
import { TNoParams } from "@/lib/types/common"
import { fetchAPI } from "@/lib/utils/fetch-api"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import NewsCard from "./news-card"

export default function News() {
	const { user } = useAuth()
	const { data } = useQuery({
		queryKey: ["news-fetch", user?.companyId],
		queryFn: async () => {
			// return sampleNewsResponse as ArticlesApiResponse;
			const res = await fetchAPI<
				ArticlesApiResponse,
				TNoParams,
				{ id: string }
			>({
				url: "/news",
				method: "POST",
				body: {
					id: user?.companyId || "",
				},
				baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
			})
			return res.data
		},
		enabled: !!user?.companyId,
	})

	return (
		data && (
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
				{data.articles.map((article, index) => (
					<NewsCard key={index} article={article} />
				))}
			</div>
		)
	)
}
