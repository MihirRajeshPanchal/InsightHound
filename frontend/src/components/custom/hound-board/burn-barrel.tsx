import { CardType } from "@/lib/types/kanban";
import { Dispatch, DragEventHandler, SetStateAction, useState } from "react";
import { FaFire } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";

const BurnBarrel = ({
    setCards,
}: {
    setCards: Dispatch<SetStateAction<CardType[]>>;
}) => {
    const [active, setActive] = useState(false);

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        setActive(true);
    };

    const handleDragLeave = () => {
        setActive(false);
    };

    const handleDragEnd = (e: DragEvent) => {
        const cardId = e.dataTransfer?.getData("cardId");

        setCards((pv) => pv.filter((c) => c.id !== cardId));

        setActive(false);
    };

    return (
        <div
            onDrop={handleDragEnd as unknown as DragEventHandler<HTMLDivElement>}
            onDragOver={handleDragOver as unknown as DragEventHandler<HTMLDivElement>}
            onDragLeave={handleDragLeave}
            className={`mt-10 grid h-56 w-36 shrink-0 place-content-center rounded border text-3xl ${active
                ? "border-red-800 bg-red-800/20 text-red-500"
                : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
                }`}
        >
            {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
        </div>
    );
};

export default BurnBarrel