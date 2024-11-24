import dynamic from "next/dynamic";

const MarketIntelligence = dynamic(() => import("@/components/custom/market-intelligence"), { ssr: false });

export default function Page() {
	return <MarketIntelligence />
}
