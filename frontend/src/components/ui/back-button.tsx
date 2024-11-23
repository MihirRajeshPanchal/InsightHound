"use client"
import React from "react"
import { Button } from "./button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BackButton({ className }: { className?: string }) {
	const router = useRouter()
	return (
		<Button onClick={() => router.back()} className={className}>
			<ArrowLeft />
			Back
		</Button>
	)
}
