import { useEffect, useRef, useState } from "react"
import Column from "./column"
// import { DEFAULT_CARDS } from "@/lib/constants";
import BurnBarrel from "./burn-barrel"
import {
	CardType,
	ColumnTypeEnum,
	GetHoundBoardResponse,
	UpdateHoundBoardRequest,
} from "@/lib/types/kanban"
import { useMutation } from "@tanstack/react-query"
import { fetchAPI } from "@/lib/utils/fetch-api"
import { TNoParams } from "@/lib/types/common"
import { useAuth } from "@/hooks/use-auth"

async function updateCards(cards: CardType[], id: string | null | undefined) {
	if (!id) return
	const body: UpdateHoundBoardRequest = {
		id,
		tasks: cards.map((card) => ({
			status: card.column,
			task: card.title,
		})),
	}
	await fetchAPI<TNoParams, TNoParams, UpdateHoundBoardRequest>({
		url: "/kanban_put",
		method: "PUT",
		body,
		baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
	})
}
function useCardChange() {
	const { user } = useAuth()
	const mutation = useMutation({
		mutationKey: ["update-board", user?.companyId],
		mutationFn: ({ cards }: { cards: CardType[] }) =>
			updateCards(cards, user?.companyId),
	})
	return mutation
}
const Board = ({ data }: { data: GetHoundBoardResponse }) => {
	const defaultData: CardType[] = data.tasks.map((task, idx) => ({
		title: task.task,
		id: idx.toString(),
		column: task.status,
	}))
	const savedCards = useRef<string>(JSON.stringify(defaultData))
	const [cards, setCards] = useState(defaultData)
	const mutation = useCardChange()

	useEffect(() => {
		if (cards && savedCards.current !== JSON.stringify(cards)) {
			savedCards.current = JSON.stringify(cards)
			console.log("Cards changed:", cards)
			mutation.mutate({ cards })
		}
	}, [cards, mutation])

	return (
		<div className="flex h-full w-full flex-wrap gap-3 p-12">
			<Column
				title="Backlog"
				column={ColumnTypeEnum.BACKLOG}
				headingColor="text-neutral-500"
				cards={cards}
				setCards={setCards}
			/>
			<Column
				title="TODO"
				column={ColumnTypeEnum.TODO}
				headingColor="text-yellow-200"
				cards={cards}
				setCards={setCards}
			/>
			<Column
				title="In progress"
				column={ColumnTypeEnum.IN_PROGRESS}
				headingColor="text-blue-200"
				cards={cards}
				setCards={setCards}
			/>
			<Column
				title="Complete"
				column={ColumnTypeEnum.DONE}
				headingColor="text-emerald-200"
				cards={cards}
				setCards={setCards}
			/>
			<BurnBarrel setCards={setCards} />
		</div>
	)
}

export default Board
