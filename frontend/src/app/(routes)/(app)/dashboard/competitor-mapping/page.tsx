import dynamic from "next/dynamic";

const CompetitorMapping = dynamic(() => import("@/components/custom/competitor-mapping"), { ssr: false });

export default async function Page() {

	return <CompetitorMapping />
}
