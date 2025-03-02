import { NavLinkProps } from "@/lib/types/common"
import { ArrowTopRightIcon } from "@radix-ui/react-icons"
import React from "react"
import NavLink from "./nav-link"
import { ModeToggle } from "@/components/ui/mode-toggle"
import Link from "next/link"

export default function Navbar() {
	const navLinks: NavLinkProps[] = [
		{
			name: "Home",
			href: "/",
		},
		{
			name: "Create",
			href: "/create",
		},
		{
			name: "Docs",
			href: "/docs",
		},
		{
			name: "Contact",
			href: "https://www.varad.xyz/contact",
		},
	]
	return (
		<>
			<div className="flex w-full justify-between items-center min-h-14 opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto px-6 max-w-7xl mx-auto">
				<div className="flex items-center gap-2 min-w-32">
					<div className="size-6 rounded-full bg-foreground" />
					<h1 className="text-lg font-black">InsightHound</h1>
				</div>
				<div className="min-w-32 flex items-center gap-2 justify-end">
					<Link
						href={"https://github.com/vaxad/create-vaxad-app/"}
						className="flex w-fit items-center gap-1 hover:border-b border-foreground cursor-pointer"
					>
						Repo
						<ArrowTopRightIcon />
					</Link>
					<ModeToggle />
				</div>
			</div>
			<nav className="flex fixed top-2 rounded-full border border-foreground p-0.5 w-fit left-1/2 -translate-x-1/2 bg-background z-50 dark:shadow-[0_1px_50px_#FFFFFF40] shadow-[0_1px_50px_#00000040]">
				{navLinks.map((link, index) => (
					<NavLink key={index} href={link.href} name={link.name} />
				))}
			</nav>
		</>
	)
}
