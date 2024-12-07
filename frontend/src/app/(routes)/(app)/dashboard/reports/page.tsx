import dynamic from "next/dynamic"

const HoundReport = dynamic(() => import("@/components/custom/hound-report"), {
	ssr: false,
})
export default function Page() {
	return <HoundReport />
}
