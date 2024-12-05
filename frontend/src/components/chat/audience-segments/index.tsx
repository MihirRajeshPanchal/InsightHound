"use client"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/ui/select"
import { useAuth } from "@/hooks/use-auth"
import { Segment } from "@/lib/types/api"
import { TNoParams } from "@/lib/types/common"
import { fetchAPI } from "@/lib/utils/fetch-api"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import SegmentCard from "./card"
import { Label } from "@/components/ui/label"
import Loading from "@/components/loading"

export default function AudienceSegment() {
	const { user } = useAuth()
	const [selectedSegment, setSelectedSegment] = useState<number>(0)
	const { data } = useQuery({
		queryKey: ["audience-segments", user?.companyId],
		queryFn: async () => {
			const response = await fetchAPI<
				{ segments: Segment[] },
				TNoParams,
				{ id: string }
			>({
				url: "/marketsegment",
				method: "POST",
				body: { id: user?.companyId || "" },
				baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
			})
			return response.data
		},
		enabled: !!user,
	})
	if (!data?.segments) {
		return <Loading />
	}
	return (
		<div className="flex flex-col p-4">
			<Label className="pb-2">Select Segment</Label>
			<Select onValueChange={(str) => setSelectedSegment(Number(str))}>
				<SelectTrigger>
					{data.segments[selectedSegment].segment}
				</SelectTrigger>
				<SelectContent>
					{data?.segments.map((seg, idx) => (
						<SelectItem value={String(idx)} key={idx}>
							{seg.segment}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<SegmentCard segmentData={data.segments[selectedSegment]} />
		</div>
	)
}
