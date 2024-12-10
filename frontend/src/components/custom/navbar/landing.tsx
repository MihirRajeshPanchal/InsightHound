import Link from "next/link"
import React from "react"
import ActiveLink, { ActiveLinkProps } from "./active-link"

export default function NavbarLanding() {
	const paths: ActiveLinkProps[] = [
		{
			href: "/",
			title: "Home",
		},
		{
			href: "/contact",
			title: "Contact us",
		},
		{
			href: "/#features",
			title: "Services",
		},
	]
	return (
		<header className="fixed z-50 top-7 left-1/2 -translate-x-1/2 w-[min(768px,100%_-_1rem)] px-8 py-3 flex justify-between rounded-full bg-black/20 backdrop-blur-xl backdrop-saturate-150 border border-text/20">
			<img src="logo.png" alt="Logo" className="w-full max-w-6" />
			<nav className="content-center">
				<ul className="flex items-center gap-4 lg:gap-8">
					{paths.map((path, index) => (
						<ActiveLink key={index} {...path} />
					))}
					<li>
						<Link href="/chat">
							<button className="text-lg font-medium bg-accent px-4 py-1 rounded-lg">
								Get Started
							</button>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}
