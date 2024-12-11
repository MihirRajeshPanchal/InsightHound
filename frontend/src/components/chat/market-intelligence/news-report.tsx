// import { sampleNewsResponse } from '@/lib/sample';
import { ArticlesApiResponse } from "@/lib/types/api"
import React from "react"
import NewsCard from "./news-report-card"
import { Button } from "@/components/ui/button"
import { NewsData } from "@/lib/types/chat"
import { useQuery } from "@tanstack/react-query"
import Loader from "../loader"
import { fetchAPI } from "@/lib/utils/fetch-api"

export default function News({ data }: { data: NewsData }) {
	const { data: result, isLoading } = useQuery({
		queryKey: ["news", data.company_name],
		queryFn: async () => {
			if (!data?.news_url) return
			const resp = await fetchAPI<ArticlesApiResponse>({
				url: "",
				method: "GET",
				baseUrl: data.news_url,
			})
			return resp.data
		},
	})

	if (isLoading) {
		return (
			<div className="flex justify-center gap-2 flex-col items-center [--loaderWidth:100px] [--loaderTextWidth:100px] [--loaderDuration:1.5s] p-4">
				<Loader />
			</div>
		)
	}

	return (
		<div className="flex flex-col items-end">
			<div className="report | grid grid-cols-2 w-full *:w-full gap-4">
				{result?.articles
					.slice(0, 2)
					.map((article, index) => (
						<NewsCard key={index} article={article} />
					))}
			</div>
			<Button className="w-fit tems-end mt-4 ">Show more</Button>
		</div>
	)
}
