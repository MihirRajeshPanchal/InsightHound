import dynamic from "next/dynamic"

const FeedbackHubAnalytics = dynamic(
	() => import("@/components/custom/feedback-hub/analysis"),
	{ ssr: false },
)
export default function Page() {
	return <FeedbackHubAnalytics />
}
