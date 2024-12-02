export interface TableRow {
	email: string
	[key: string]: string
}

export interface TableDataProps {
	tableData: TableRow[]
	columns: string[]
	setTableData: React.Dispatch<React.SetStateAction<TableRow[]>>
	setColumns: React.Dispatch<React.SetStateAction<string[]>>
}
