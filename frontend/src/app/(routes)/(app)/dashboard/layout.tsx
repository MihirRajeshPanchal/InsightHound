import { AppSidebar } from "@/components/app-sidebar"
import DashboardBreadCrumb from "@/components/custom/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar"
import dynamic from "next/dynamic"
const LogoutBtn = dynamic(() => import("@/components/ui/logout-btn"), {
	ssr: false,
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-accent/5">
					<div className="flex w-full items-center">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 h-4"
						/>
						<DashboardBreadCrumb />
					</div>
					<LogoutBtn />
				</header>
				{children}
			</SidebarInset>
		</SidebarProvider>
	)
}
