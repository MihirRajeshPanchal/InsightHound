"use client"
import Papa from "papaparse"
import { TableDataProps, TableRow } from "@/lib/types/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
	Table,
	TableHeader,
	TableRow as TR,
	TableHead as TH,
	TableCell as TD,
	TableBody,
} from "@/components/ui/table"
import { Plus, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function TableData({
	columns,
	setColumns,
	setTableData,
	tableData,
}: TableDataProps) {
	const handleInputChange = (
		rowIndex: number,
		column: string,
		value: string,
	) => {
		const updatedData = [...tableData]
		updatedData[rowIndex][column] = value
		setTableData(updatedData)
	}

	const addColumn = () => {
		const newColumn = `var${columns.length}`
		setColumns([...columns, newColumn])
	}

	const addRow = () => {
		const newRow: TableRow = { email: "", var1: "", var2: "" }
		columns.slice(3).forEach((col) => (newRow[col] = ""))
		setTableData([...tableData, newRow])
	}

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			Papa.parse(e.target.files[0], {
				header: true,
				skipEmptyLines: true,
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				complete: (results: any) => {
					const data = results.data
					const csvColumns = Object.keys(data[0])
					setColumns(csvColumns)
					setTableData(data)
				},
			})
		}
	}

	return (
		<div className="pt-6">
			<h1 className="text-2xl font-bold">
				Send Bulk Mails to your customers
			</h1>

			<div className="flex md:flex-row flex-col w-full items-center justify-between pt-6">
				<h2 className="text-xl font-semibold">Manual Data Entry</h2>
				<h3 className="text-xl font-bold">OR</h3>
				<Input
					className="w-fit"
					placeholder="Upload CSV"
					type="file"
					accept=".csv"
					onChange={handleFileUpload}
				/>
			</div>
			<Separator className="my-2" />
			<Table>
				<TableHeader>
					<TR>
						{columns.map((col, index) => (
							<TH key={index} className="font-bold text-lg group">
								<span className="pr-3 block group-hover:hidden">
									{col}
								</span>
								<Button
									variant="destructive"
									size="sm"
									className="p-1 py-1 aspect-square hidden group-hover:flex"
									onClick={() =>
										setColumns(
											columns.filter(
												(_, i) => i !== index,
											),
										)
									}
								>
									{" "}
									<X size={15} />
								</Button>
							</TH>
						))}
						<TH>
							<Button
								onClick={addColumn}
								className="p-1 aspect-square"
							>
								<Plus />
							</Button>
						</TH>
					</TR>
				</TableHeader>
				<TableBody>
					{tableData.map((row, rowIndex) => (
						<TR key={rowIndex} className="group">
							{columns.map((col, colIndex) => (
								<TD key={colIndex}>
									<Input
										type="text"
										value={row[col] || ""}
										onChange={(e) =>
											handleInputChange(
												rowIndex,
												col,
												e.target.value,
											)
										}
									/>
								</TD>
							))}
							<TD>
								<Button
									variant="destructive"
									className="p-1 aspect-square group-hover:visible invisible"
									onClick={() =>
										setTableData(
											tableData.filter(
												(_, i) => i !== rowIndex,
											),
										)
									}
								>
									{" "}
									<X size={15} />
								</Button>
							</TD>
						</TR>
					))}
					<TR>
						<TD colSpan={columns.length + 1}>
							<Button
								onClick={addRow}
								className="p-1 aspect-square w-full"
							>
								<Plus />
							</Button>
						</TD>
					</TR>
				</TableBody>
			</Table>
		</div>
	)
}
