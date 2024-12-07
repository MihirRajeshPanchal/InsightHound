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
import Link from "next/link"

const conversations: { id: string; title: string }[] = [
	{
		id: "1223",
		title: "Customer Support",
	},
	{
		id: "1224",
		title: "Sales",
	},
	{
		id: "1225",
		title: "Marketing",
	},
	{
		id: "1226",
		title: "Product",
	},
	{
		id: "1227",
		title: "Engineering",
	},
]
export function ChatSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<Link href="/">
					<div className="flex gap-2 font-semibold text-lg items-end leading-none p-2">
						{/* <FramerLogoIcon className="size-6" /> */}
						<img src="/logo.png" alt="Logo" className="h-6" />
						InsightHound
					</div>
				</Link>
				<SearchForm />
			</SidebarHeader>
			<SidebarContent>
				{/* We create a SidebarGroup for each parent. */}
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									url="/chat"
								>
									<Link href="/chat">
										New Chat
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Previous Chats</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{conversations.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										url={`/chat/${item.id}`}
									>
										<Link href={`/chat/${item.id}`}>
											{item.title}
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}
