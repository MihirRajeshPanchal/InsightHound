import React from "react"
import Loader from "./loader"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { StopCircle } from "lucide-react"

interface LoadingOverlayProps {
	show: boolean
	handleStop: () => void
}
export default function LoadingOverlay({
	show,
	handleStop,
}: LoadingOverlayProps) {
	return (
		<div
			className={cn(
				"fixed top-0 left-0 h-screen w-screen flex flex-col gap-6 items-center justify-center bg-transparent bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 [--loaderWidth:218px] [--loaderTextWidth:324px] [--loaderDuration:2s] transition-opacity",
				show
					? "opacity-100 z-[999]"
					: "opacity-0 pointer-events-none -z-20",
			)}
		>
			<Loader />
			<div className="absolute bottom-6 right-6">
				<Button
					className="h-12 w-12"
					variant="outline"
					onClick={handleStop}
				>
					<StopCircle size={24} />{" "}
				</Button>
			</div>
		</div>
	)
}
