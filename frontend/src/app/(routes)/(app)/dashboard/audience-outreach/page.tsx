import dynamic from "next/dynamic"
import React from "react"
const AudienceOutreach = dynamic(
	() => import("@/components/custom/audience-outreach"),
	{ ssr: false },
)
export default function Page() {
	return <AudienceOutreach />
}
