import * as React from "react"

import { SearchForm } from "@/components/search-form"
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar"

const data = {
	versions: ["1.0.1"],
	navMain: [
		{
			title: "Overview",
			url: "/dashboard",
			items: [
				{
					title: "Dashboard",
					url: "/dashboard",
				},
			],
		},
		{
			title: "Market Insights",
			url: "#",
			items: [
				{
					title: "Market Intelligence",
					url: "/dashboard/market-intelligence",
				},
				{
					title: "Competitor Mapping",
					url: "/dashboard/competitor-mapping",
				},
				{
					title: "Strategic Insights",
					url: "/dashboard/strategic-insights",
				},
			],
		},
		{
			title: "Audience & Recommendations",
			url: "#",
			items: [
				{
					title: "Audience Insights",
					url: "/dashboard/audience-insights",
				},
				{
					title: "Custom Recommendations",
					url: "/dashboard/custom-recommendations",
				},
			],
		},
		{
			title: "Feedback & Analytics",
			url: "#",
			items: [
				{
					title: "Feedback Hub",
					url: "/dashboard/feedback-hub",
				},
				{
					title: "Feedback Analytics",
					url: "/dashboard/feedback-hub/analytics",
				},
			],
		},
		{
			title: "Reports & Data",
			url: "#",
			items: [
				{
					title: "Reports",
					url: "/dashboard/reports",
				},
			],
		},
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<div className="flex gap-2 font-semibold text-lg items-end leading-none p-2">
					{/* <FramerLogoIcon className="size-6" /> */}
					<img src="/logo.png" alt="Logo" className="h-6" />
					Insight Hound
				</div>
				<SearchForm />
			</SidebarHeader>
			<SidebarContent>
				{/* We create a SidebarGroup for each parent. */}
				{data.navMain.map((item) => (
					<SidebarGroup key={item.title}>
						<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{item.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											asChild
											url={item.url}
										>
											<a href={item.url}>{item.title}</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}
