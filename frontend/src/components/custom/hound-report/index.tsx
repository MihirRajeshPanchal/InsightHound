"use client"
import Loading from "@/components/loading"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/hooks/use-auth"
import { TNoParams } from "@/lib/types/common"
import { fetchAPI } from "@/lib/utils/fetch-api"
import { useQuery } from "@tanstack/react-query"
import React from "react"

export default function HoundReport() {
	const { user } = useAuth()
	const { data } = useQuery({
		queryKey: ["hound-report", user?.companyId],
		queryFn: async () => {
			const res = await fetchAPI<
				{ html_content: string },
				TNoParams,
				{ id: string }
			>({
				url: "/report_generate",
				method: "POST",
				body: {
					id: user?.companyId || "",
				},
				baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
			})
			return res.data
		},
		enabled: !!user?.companyId,
	})
	const html =
		(`
            <div class="iHoundReportWrapper">
                ${data?.html_content}
            </div>
        ` || "") +
		`<style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
        .iHoundReportWrapper {
	        --background: 0 0% 8%;
	        --text: 32 19% 87%;
	        --accent: 233 57% 60%;
        }
        .iHoundReportWrapper {
            font-family: 'DM Sans', sans-serif;
            background: hsl(var(--text));
            color: hsl(var(--background));
        }
        .iHoundReportWrapper, 
        .iHoundReportWrapper * {
        // outline: solid;
    }
    </style>`
	const handleDownloadPdf = () => {
		if (!html.trim()) {
			return
		}

		const printWindow = window.open("", "_blank")
		if (printWindow) {
			printWindow.document.open()
			printWindow.document.write(html)
			printWindow.document.close()

			printWindow.print()

			printWindow.onafterprint = () => {
				printWindow.close()
			}
		}
	}
	if (!data) {
		return <Loading />
	}
	return (
		<div>
			<div className="flex justify-between items-center p-6">
				<h2 className="font-bold text-2xl">Report Generation</h2>
				<RainbowButton onClick={handleDownloadPdf}>
					Download as DOCX
				</RainbowButton>
			</div>
			<ScrollArea className="h-[80vh] max-w-screen-md w-full mx-auto my-8">
				<div
					className="p-6 border-2 border-text/20 rounded-lg *:rounded-lg"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</ScrollArea>
		</div>
	)
}
