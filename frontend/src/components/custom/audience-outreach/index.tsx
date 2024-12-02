import dynamic from "next/dynamic"
import React from "react"
const AudienceOutreachForm = dynamic(
	() => import("@/components/custom/audience-outreach/form"),
	{ ssr: false },
)

export default function AudienceOutreach() {
	return (
		<div>
			<AudienceOutreachForm />
		</div>
	)
}
