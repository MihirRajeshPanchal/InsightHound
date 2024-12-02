"use client"

import Loading from "@/components/loading"
import { useAuth } from "@/hooks/use-auth"
import { QuestionsData } from "@/lib/types/api"
import { TNoParams } from "@/lib/types/common"
import { generateMockResponses } from "@/lib/utils"
import { fetchAPI } from "@/lib/utils/fetch-api"
import { useQuery } from "@tanstack/react-query"
import SurveyResultsCharts from "./charts"

export default function FeedbackAnalysis() {
	const { user } = useAuth()

	const { data: questionsData } = useQuery({
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
	const data = questionsData
		? generateMockResponses(questionsData.questions)
		: null
	if (!data) {
		return <Loading />
	}
	return <SurveyResultsCharts surveyData={data} />
}
