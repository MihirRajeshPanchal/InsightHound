"use client"
import React from "react"
import Board from "./board"
import { useAuth } from "@/hooks/use-auth"
import Loading from "@/components/loading"
import { useQuery } from "@tanstack/react-query"
import { fetchAPI } from "@/lib/utils/fetch-api"
import { GetHoundBoardResponse } from "@/lib/types/kanban"
import { TNoParams } from "@/lib/types/common"

async function fetchHoundBoard({ id }: { id: string }) {
	const response = await fetchAPI<
		GetHoundBoardResponse,
		TNoParams,
		{ id: string }
	>({
		url: "/kanban",
		method: "POST",
		body: {
			id,
		},
		baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
	})
	return response.data
}
const HoundBoard = () => {
	const { user } = useAuth()

	const { data } = useQuery({
		queryKey: ["hound-board", user?.companyId],
		queryFn: () =>
			user?.companyId ? fetchHoundBoard({ id: user?.companyId }) : null,
		enabled: !!user,
	})

	if (!user || !data) {
		return <Loading />
	}
	return (
		<div className="h-screen w-full bg-neutral-900 text-neutral-50">
			<Board data={data} />
		</div>
	)
}

export default HoundBoard
