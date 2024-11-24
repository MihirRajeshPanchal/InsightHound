import { CoordinateDataApiResponse } from "@/lib/types/api"
import dynamic from "next/dynamic"
import { useMemo } from "react"

export default function Map({ data }: { data: CoordinateDataApiResponse }) {
	const MapComponent = useMemo(
		() => dynamic(() => import("./client"), { ssr: false }),
		[],
	)

	return (
		<section className="~h-full w-full rounded-xl overflow-clip h-[90vh]">
			<MapComponent data={data} />
		</section>
	)
}
