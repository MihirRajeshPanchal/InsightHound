"use client"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/ui/select"
import { Segment } from "@/lib/types/api"
import { useState } from "react"
import SegmentCard from "./card"
import { Label } from "@/components/ui/label"

export default function AudienceSegment({
	data,
}: {
	data: Segment[]
}) {
	const [selectedSegment, setSelectedSegment] = useState<number>(0)
	return (
		<div className="flex flex-col">
			<Label className="pb-2">Select Segment</Label>
			<Select onValueChange={(str) => setSelectedSegment(Number(str))}>
				<SelectTrigger>
					{data[selectedSegment].segment}
				</SelectTrigger>
				<SelectContent>
					{data?.map((seg, idx) => (
						<SelectItem value={String(idx)} key={idx}>
							{seg.segment}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<SegmentCard segmentData={data[selectedSegment]} />
		</div>
	)
}
