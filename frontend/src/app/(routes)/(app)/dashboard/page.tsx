import dynamic from "next/dynamic"
import React from "react"

const Charts = dynamic(() => import("@/components/custom/charts"), { ssr: false })

export default function Page() {
	return (
		<div>
			<Charts />
		</div>
	)
}
