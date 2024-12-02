import React from "react"
import { Skeleton } from "./ui/skeleton"

export default function Loading() {
	return (
		<div className="min-h-[100svh-56px] flex flex-col p-6">
			<Skeleton className="h-16 w-[60vw]" />
			<Skeleton className="h-8 w-[80vw] mt-12" />
			<Skeleton className="h-8 w-[80vw] mt-2" />
			<div className="grid grid-cols-4 mt-12 gap-6">
				{[1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
					<Skeleton key={i} className="h-48 w-full" />
				))}
			</div>
		</div>
	)
}
