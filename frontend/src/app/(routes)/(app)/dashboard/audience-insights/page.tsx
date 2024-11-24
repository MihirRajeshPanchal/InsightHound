import { KeywordsResponse } from "@/lib/types/api"
import { TNoParams } from "@/lib/types/common"
import { fetchAPI } from "@/lib/utils/fetch-api"
import dynamic from "next/dynamic"

const AudienceInsights = dynamic(() => import("@/components/custom/audience-insight"), { ssr: false })
export default async function Page() {
	const data = await fetchAPI<KeywordsResponse, TNoParams, { id: string }>({
		url: "/keywords",
		method: "POST",
		body: { id: "6740bfc005979e30ad967285" }, // TODO: replace with user.company.id
		baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
	})
	return <AudienceInsights keywords={data.data?.keywords || [""]} />
}
