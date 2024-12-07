// import { sampleNewsResponse } from '@/lib/sample';
import { ArticlesApiResponse } from "@/lib/types/api"
import React from "react"
import NewsCard from "./news-card"
import { Button } from "@/components/ui/button"

export default function News({ data }: { data: ArticlesApiResponse }) {
	const [shown, setShown] = React.useState<number>(
		Math.min(6, data.articles.length),
	)
	return (
		<div className="flex flex-col items-end">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{data.articles.slice(0, shown).map((article, index) => (
					<NewsCard key={index} article={article} />
				))}
			</div>
			<Button
				className="w-fit tems-end mt-4 "
				onClick={() =>
					setShown((prev) => Math.min(prev + 6, data.articles.length))
				}
			>
				Show more
			</Button>
		</div>
	)
}
