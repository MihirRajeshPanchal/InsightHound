import { NotFoundHound } from "@/assets/svgs"
import React from "react"

export default function NotFound() {
	return (
		<div className="flex justify-center items-center h-[90vh]">
			<div className="flex flex-col items-center gap-4">
				<NotFoundHound className="translate-x-6" />
				<h1 className="text-4xl font-bold">Hound not found</h1>
				<p className="text-lg text-gray-500">
					Please select a conversation from the sidebar
				</p>
			</div>
		</div>
	)
}
