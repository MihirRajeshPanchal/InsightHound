import AuthLock from "@/components/wrappers/auth-lock"

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <AuthLock>{children}</AuthLock>
}
