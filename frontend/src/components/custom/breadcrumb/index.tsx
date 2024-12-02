"use client"
import React from "react"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function DashboardBreadCrumb() {
	const pathname = usePathname()
	const path = pathname.split("/").filter(Boolean)
	const pathToTitle: Record<string, string> = {
		dashboard: "Building your startup",
		"market-intelligence": "Real-time market trends",
		"audience-insights": "Understanding your audience",
		"feedback-hub": "Get a pulse on your audience",
		analytics: "Get Insights",
		"strategic-insights": "Strategic Insights",
		"bulk-mail": "Bulk Mailing",
		reports: "Comprehensive analytics",
		"competitor-mapping": "Identify and analyze your competitors",
		"custom-recommendations": "Receive personalized action plans",
		"audience-outreach": "Engage with your audience",
		"audience-segments": "Segment your audience",
		"hound-board": "Plot your roadmap",
	}
	function getPath(i: number): string {
		return "/" + path.slice(0, i + 1).join("/")
	}
	function isActive(i: number): boolean {
		return getPath(i) === pathname
	}
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{path.map((p, i) => (
					<React.Fragment key={i}>
						<BreadcrumbItem
							className={cn(isActive(i) && "text-white")}
						>
							<BreadcrumbLink href={getPath(i)}>
								{pathToTitle[p]}
							</BreadcrumbLink>
						</BreadcrumbItem>
						{i !== path.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
