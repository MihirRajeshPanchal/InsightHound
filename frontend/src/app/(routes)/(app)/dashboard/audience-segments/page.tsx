import dynamic from "next/dynamic"

const AudienceSegment = dynamic(
	() => import("@/components/custom/audience-segments"),
	{ ssr: false },
)

export default function Page() {
	return <AudienceSegment />
}
