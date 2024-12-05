import dynamic from "next/dynamic"
import React from "react"
const Loader = dynamic(() => import("@/components/custom/loader"), {
	ssr: false,
})

export default function Loading() {
	return (
		<div className="iHoundLoaderWrapper [--loaderWidth:218px] [--loaderTextWidth:324px] [--loaderDuration:2s] w-full h-full grid gap-12 place-content-center place-items-center">
			<Loader />
		</div>
	)
}
