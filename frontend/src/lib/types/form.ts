import { TextPosition } from "./image"
import { TableRow } from "./table"

export interface FormProps {
	columns: string[]
	tableData: TableRow[]
	textPositions: TextPosition[]
	imageRef: React.RefObject<HTMLDivElement>
	image: string | null
}

export interface EmailFormResponse {
	subject: string
	email_template: string
}

export interface EmailFormRequest {
	id: string
	array: string[]
}
