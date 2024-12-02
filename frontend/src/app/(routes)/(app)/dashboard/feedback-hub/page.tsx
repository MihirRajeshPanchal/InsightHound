import dynamic from "next/dynamic"

const FeedbackHub = dynamic(() => import("@/components/custom/feedback-hub"), {
	ssr: false,
})
export default function Page() {
	return <FeedbackHub />
}
