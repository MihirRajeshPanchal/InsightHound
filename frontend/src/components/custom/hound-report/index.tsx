"use client"
import { RainbowButton } from "@/components/ui/rainbow-button"
import React from "react"

export default function HoundReport({ html }: { html: string }) {
	const handleDownloadPdf = () => {
		if (!html.trim()) {
			alert("Please enter some HTML content.")
			return
		}

		// Create a new window to render the content
		const printWindow = window.open("", "_blank")
		if (printWindow) {
			printWindow.document.open()
			printWindow.document.write(html)
			printWindow.document.close()

			// Trigger the print dialog (user can choose "Save as PDF")
			printWindow.print()

			// Optionally close the window after printing
			printWindow.onafterprint = () => {
				printWindow.close()
			}
		}
	}

	return (
		<div>
			<RainbowButton onClick={handleDownloadPdf}>
				Download as DOCX
			</RainbowButton>
		</div>
	)
}
