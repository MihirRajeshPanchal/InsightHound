"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { HTMLAttributes } from "react"

export type ActiveLinkProps = {
	href: string
	title: string
	titleClassname?: string
}
export default function ActiveLink(
	props: HTMLAttributes<HTMLAnchorElement> & ActiveLinkProps,
) {
	const path = usePathname()
	const isActive = path === props.href
	return (
		<Link {...props} className={cn("hidden md:block", props.className)}>
			<li
				className={cn(
					"text-lg font-medium",
					!isActive ? "text-text/65" : "",
					props.titleClassname,
				)}
			>
				{props.title}
			</li>
		</Link>
	)
}
