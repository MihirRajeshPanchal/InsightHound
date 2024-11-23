import React from "react"
import Map from "../map"
import { MapComponentProps } from "@/lib/types/map"
import { heatmapData } from "@/lib/sample"

export default function AudienceInsights() {
	const data: MapComponentProps["data"] = heatmapData.map((coord) => ({
		coord,
	}))
	return (
		<div className="flex flex-col gap-6 p-4">
			<Map data={data} />
		</div>
	)
}
