import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { ThemeProvider } from "@/components/wrappers/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "sonner"
import { UserProvider } from "@/hooks/use-auth"
import dynamic from "next/dynamic"
const QueryProviderWrapper = dynamic(
	() => import("@/components/wrappers/query-provider"),
	{ ssr: false },
)

const clashGrotesk = localFont({
	src: "../fonts/ClashGrotesk-Variable.woff2",
	variable: "--font-CG",
})

export const metadata: Metadata = {
	title: "Insight Hound",
	description:
		"Uncover powerful data-driven insights with Insight Hound. Analyze trends, visualize patterns, and optimize strategies with our intuitive and user-friendly platform.",
	applicationName: "Insight Hound",
	authors: [
		{
			name: "DjDawgs",
			url: "https://github.com/vaxad/DjDawgs_100X_Buildathon",
		},
	],
	generator: "Insight Hound Data Analysis Engine",
	keywords: [
		"data analysis",
		"insights",
		"business intelligence",
		"trends visualization",
		"strategy optimization",
		"analytics platform",
	],
	referrer: "origin",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${clashGrotesk.variable} [font-family:var(--font-CG)] antialiased`}
			>
				<TooltipProvider>
					<QueryProviderWrapper>
						<UserProvider>
							<ThemeProvider
								attribute="class"
								defaultTheme="system"
								enableSystem
								disableTransitionOnChange
							>
								<Toaster />
								<div className="rootWrapper">
									{/* <Navbar /> */}
									{children}
								</div>
							</ThemeProvider>
						</UserProvider>
					</QueryProviderWrapper>
				</TooltipProvider>
			</body>
		</html>
	)
}
