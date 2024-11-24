"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
	return (
		<div className="flex justify-center items-center min-h-[80vh]">
			<div className="flex flex-col justify-center items-center gap-4">
				<h1 className="text-3xl font-bold">Reports</h1>
				<img src="/images/chill.png" alt="Reports" className="h-96" />
				<Link href="/dashboard"><Button>Just Chill</Button></Link>
			</div>
		</div>
	)
}
