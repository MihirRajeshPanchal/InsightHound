export interface ImageEditorProps {
    columns: string[];
    tableData: { [key: string]: string }[];
    image: string | null;
    textPositions: TextPosition[];
    setImage: React.Dispatch<React.SetStateAction<string | null>>;
    setTextPositions: React.Dispatch<React.SetStateAction<TextPosition[]>>;
    imageRef: React.RefObject<HTMLDivElement>;
}

export interface TextPosition {
    id: number;
    column: string;
    x: number;
    y: number;
    color: string;
    backgroundColor: string;
    fontSize: number;
    fontWeight: string;
    fontStyle: string;
    fontFamily: string;
}