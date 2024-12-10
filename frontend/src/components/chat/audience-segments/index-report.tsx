"use client"

import { Segment } from "@/lib/types/api"
import SegmentCard from "./card"

export default function AudienceSegment({ data }: { data: Segment[] }) {
	return (
		<div className="flex flex-col">
			=
			{data.map((item, idx) => (
				<div key={idx} className="[&_h1]:!text-background">
					<SegmentCard segmentData={item} />
				</div>
			))}
		</div>
	)
}
