"use client"

import { getToken } from "@/lib/utils/token";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLock({ children }: { children: React.ReactNode }) {
    const path = usePathname();
    const publicPaths = ["/", "/auth"];
    const router = useRouter();
    useEffect(() => {
        const token = getToken();
        if (!token && !publicPaths.includes(path)) {
            router.push("/auth");
        }
    }, [path])

    return (
        <>
            {children}
        </>
    )
}
