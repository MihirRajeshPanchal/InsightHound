import { useEffect, useRef, useState } from "react"
import Column from "./column"
// import { DEFAULT_CARDS } from "@/lib/constants";
import BurnBarrel from "./burn-barrel"
import {
	CardType,
	ColumnTypeEnum,
	GetHoundBoardResponse,
} from "@/lib/types/kanban"
import { useMutation } from "@tanstack/react-query"
import { fetchAPI } from "@/lib/utils/fetch-api"
import { TNoParams } from "@/lib/types/common"

type KanbanPutBody = { id: string; kanban_str: string }
async function updateCards(cards: CardType[], id: string) {
	if (!id) return
	const body: KanbanPutBody = {
		id,
		kanban_str: JSON.stringify(
			cards.map((card) => ({
				status: card.column,
				task: card.title,
			})),
		),
	}
	await fetchAPI<TNoParams, TNoParams, KanbanPutBody>({
		url: "/kanban_put_aggregate",
		method: "PUT",
		body,
		baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
	})
}
function useCardChange(messageId: string) {
	const mutation = useMutation({
		mutationKey: ["update-board", messageId],
		mutationFn: async ({ cards }: { cards: CardType[] }) =>
			await updateCards(cards, messageId),
	})
	return mutation
}
const Board = ({
	data,
	messageId,
}: {
	data: GetHoundBoardResponse["tasks"]
	messageId: string
}) => {
	console.log(messageId)
	const defaultData: CardType[] = data.map((task, idx) => ({
		title: task.task,
		id: idx.toString(),
		column: task.status,
	}))
	const savedCards = useRef<string>(JSON.stringify(defaultData))
	const [cards, setCards] = useState(defaultData)
	const mutation = useCardChange(messageId)

	useEffect(() => {
		if (cards && savedCards.current !== JSON.stringify(cards)) {
			savedCards.current = JSON.stringify(cards)
			mutation.mutate({ cards })
		}
	}, [cards, mutation])

	return (
		<div className="flex h-full w-full flex-wrap gap-3 px-4">
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
