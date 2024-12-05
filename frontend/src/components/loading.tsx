import React from "react"
import Loader from "./custom/loader"

export default function Loading() {
	return (
		<div className="[--loaderWidth:218px] [--loaderTextWidth:324px] [--loaderDuration:2s] w-full h-full grid gap-12 place-content-center place-items-center">
			<Loader />
		</div>
	)
}
