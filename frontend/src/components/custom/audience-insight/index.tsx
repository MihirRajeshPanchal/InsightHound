"use client"
import Map from "../map"
import { CoordinateDataApiResponse, KeywordsResponse } from "@/lib/types/api"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query"
import { fetchAPI } from "@/lib/utils/fetch-api"
import { TNoParams } from "@/lib/types/common"
import Loading from "@/components/loading"
import { locationsRecord } from "@/lib/constants"

export default function AudienceInsights({ keywords }: KeywordsResponse) {
	const [selectedKeyword, setSelectedKeyword] = useState<string>(keywords[0])
	const [selectedLocation, setSelectedLocation] = useState<string>("IN")
	useEffect(() => {
		if (keywords.length > 0)
			setSelectedKeyword(keywords[0])
	}, [keywords])

	console.log(selectedKeyword, selectedLocation)
	const { data: trendsData } = useQuery({
		queryKey: ['audience-insights', selectedKeyword, selectedLocation],
		queryFn: async () => {
			const response = await fetchAPI<CoordinateDataApiResponse, TNoParams, { query: string, geo: string }>({
				url: '/trends',
				method: 'POST',
				body: { query: selectedKeyword, geo: selectedLocation },
				baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
			});
			return response.data;
		},
		enabled: !!selectedKeyword
	})

	if (!keywords.length) {
		return <Loading />
	}
	return (
		<div className="flex flex-row gap-6 p-4">
			<Map data={trendsData || [{ coordinates: { lat: 72.03, lng: 19.03 }, extracted_value: 0, location: "Mumbai", max_value_index: 0, value: "0" }]} />
			<div className=" w-[30vw] flex flex-col gap-4">
				{selectedKeyword && <Select onValueChange={setSelectedKeyword}>
					<SelectTrigger>{selectedKeyword}</SelectTrigger>
					<SelectContent>
						{keywords.map((keyword, idx) => (
							<SelectItem value={keyword} key={idx}>{keyword}</SelectItem>
						))}
					</SelectContent>
				</Select>}

				<Select onValueChange={setSelectedLocation}>
					<SelectTrigger>{locationsRecord[selectedLocation]}</SelectTrigger>
					<SelectContent>
						{Object.keys(locationsRecord).map((keyword, idx) => (
							<SelectItem value={keyword} key={idx}>{locationsRecord[keyword]}</SelectItem>
						))}
					</SelectContent>
				</Select>

			</div>
		</div >
	)
}
