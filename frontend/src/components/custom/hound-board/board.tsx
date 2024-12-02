import { useState } from "react";
import Column from "./column";
import { DEFAULT_CARDS } from "@/lib/constants";
import BurnBarrel from "./burn-barrel";
import { ColumnTypeEnum } from "@/lib/types/kanban";

const Board = () => {
    const [cards, setCards] = useState(DEFAULT_CARDS);

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
    );
};

export default Board