"use client"

import { getToken } from "@/lib/utils/token"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

const publicPaths = ["/", "/auth"]
export default function AuthLock({ children }: { children: React.ReactNode }) {
	const path = usePathname()
	const router = useRouter()
	useEffect(() => {
		const token = getToken()
		if (!token && !publicPaths.includes(path)) {
			router.push("/auth")
		}
	}, [path, router])

	return <>{children}</>
}
