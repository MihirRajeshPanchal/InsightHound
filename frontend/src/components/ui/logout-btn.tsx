"use client"

import { removeToken } from "@/lib/utils/token"
import { Button } from "./button"
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
    const router = useRouter()
    function handleLogout() {
        removeToken();
        router.push('/auth');
    }
    return (
        <Button onClick={handleLogout} variant="destructive">
            Log out
        </Button>
    )
}
