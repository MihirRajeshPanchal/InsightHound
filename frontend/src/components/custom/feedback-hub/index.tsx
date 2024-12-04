"use client"

import Loading from "@/components/loading"
import { useAuth } from "@/hooks/use-auth"
import { QuestionsData } from "@/lib/types/api"
import { TNoParams } from "@/lib/types/common"
import { fetchAPI } from "@/lib/utils/fetch-api"
import { useQuery } from "@tanstack/react-query"
import QuestionnaireCard from "./card"
import { Button } from "@/components/ui/button"
import { ArrowTopRightIcon } from "@radix-ui/react-icons"

export default function FeedbackHub() {
	const { user } = useAuth()

	const { data } = useQuery({
		queryKey: ["feedback-hub", user?.companyId],
		queryFn: async () => {
			const response = await fetchAPI<
				QuestionsData,
				TNoParams,
				{ id: string }
			>({
				url: "/marketresearch",
				method: "POST",
				body: { id: user?.companyId || "" },
				baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
			})
			return response.data
		},
		enabled: !!user,
	})
	const { data: formData } = useQuery({
		queryKey: ["feedback-form", user?.companyId],
		queryFn: async () => {
			const response = await fetchAPI<
				{ form_url: string },
				TNoParams,
				QuestionsData & { id: string }
			>({
				url: "/typeform",
				method: "POST",
				body: { questions: data?.questions || [], id: user?.companyId || "" },
				baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
			})
			return response.data
		},
		enabled: !!(data && user?.companyId),
	})
	if (!data) {
		return <Loading />
	}
	return (
		<div className="flex flex-col gap-4 p-4">
			{formData && (
				<a
					target="_blank"
					className="self-end mr-4"
					href={formData.form_url}
				>
					<Button className="px-6">
						Go to form <ArrowTopRightIcon />
					</Button>
				</a>
			)}
			<QuestionnaireCard questions={data.questions} />
		</div>
	)
}
