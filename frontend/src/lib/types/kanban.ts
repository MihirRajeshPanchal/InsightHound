import { Dispatch, SetStateAction } from "react";

export type ColumnProps = {
    title: string;
    headingColor: string;
    cards: CardType[];
    column: ColumnTypeEnum;
    setCards: Dispatch<SetStateAction<CardType[]>>;
};

export type CardProps = CardType & {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    handleDragStart: Function;
};

export type DropIndicatorProps = {
    beforeId: string | null;
    column: string;
};

export type AddCardProps = {
    column: ColumnTypeEnum;
    setCards: Dispatch<SetStateAction<CardType[]>>;
};

export enum ColumnTypeEnum {
    BACKLOG = "BACKLOG",
    TODO = "TODO",
    IN_PROGRESS = "IN PROGRESS",
    DONE = "DONE"
}

export type CardType = {
    title: string;
    id: string;
    column: ColumnTypeEnum;
};

export type HoundBoardCard = {
    status: ColumnTypeEnum;
    task: string;
}

export type GetHoundBoardResponse = {
    tasks: HoundBoardCard[]
}