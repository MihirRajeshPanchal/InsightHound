// import { sampleNewsResponse } from '@/lib/sample';
import { ArticlesApiResponse } from "@/lib/types/api"
import React, { useEffect } from "react"
import NewsCard from "./news-card"
import { Button } from "@/components/ui/button"
import { NewsData } from "@/lib/types/chat"
import { useQuery } from "@tanstack/react-query"

export default function News({ data }: { data: NewsData }) {
	const { data: result } = useQuery({
		queryKey: ["news", data.company_name],
		queryFn: async () => {
			if (!data?.news_url) return
			const resp = await fetch(data.news_url)
			const result = await resp.json()
			console.log(result)
			return result as ArticlesApiResponse
		},

	})
	const [shown, setShown] = React.useState<number>(
		Math.min(6, (result?.articles?.length || 0)),
	)
	useEffect(() => {
		if (result?.articles) {
			setShown(Math.min(6, result.articles.length))
		}
	}, [result])

	return (
		<div className="flex flex-col items-end">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{result?.articles.slice(0, shown).map((article, index) => (
					<NewsCard key={index} article={article} />
				))}
			</div>
			<Button
				className="w-fit tems-end mt-4 "
				onClick={() =>
					setShown((prev) => Math.min(prev + 6, (result?.articles.length || 0)))
				}
			>
				Show more
			</Button>
		</div>
	)
}
