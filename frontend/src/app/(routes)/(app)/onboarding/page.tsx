import dynamic from "next/dynamic"
import React from "react"

const OnboardingForm = dynamic(() => import("@/components/chat/onboarding"), { ssr: false })

export default function Page() {
	return (
		<div>
			<OnboardingForm />
		</div>
	)
}
