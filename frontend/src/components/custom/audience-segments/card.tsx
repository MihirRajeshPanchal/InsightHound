import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
	Users,
	TrendingUp,
	DollarSign,
	Target,
	PieChart,
	Zap,
} from "lucide-react"
import { Segment } from "@/lib/types/api"

export default function SegmentCard({ segmentData }: { segmentData: Segment }) {
	return (
		<div className="container mx-auto p-4 bg-gradient-to-br min-h-screen text-white">
			<h1 className="text-4xl font-bold mb-8 text-center">
				{segmentData.segment}
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<CardWrapper
					icon={<Users className="h-6 w-6" />}
					title="Market Overview"
					gradient="from-blue-500 to-cyan-500"
				>
					<p>
						<strong>Unit Size:</strong> {segmentData.unit_size}
					</p>
					<p>
						<strong>Market Share:</strong>{" "}
						{segmentData.market_share}
					</p>
					<p>
						<strong>Growth Rate:</strong> {segmentData.growth_rate}
					</p>
				</CardWrapper>

				<CardWrapper
					icon={<TrendingUp className="h-6 w-6" />}
					title="User Engagement"
					gradient="from-green-500 to-emerald-500"
				>
					<p>
						<strong>Urgency:</strong> {segmentData.urgency}
					</p>
					<p>
						<strong>Utilization:</strong> {segmentData.utilization}
					</p>
					<p>
						<strong>Benefit:</strong> {segmentData.benefit}
					</p>
				</CardWrapper>

				<CardWrapper
					icon={<DollarSign className="h-6 w-6" />}
					title="Revenue Potential"
					gradient="from-yellow-500 to-orange-500"
				>
					<p>
						<strong>One-time Revenue:</strong>{" "}
						{segmentData.potential_one_time_revenue}
					</p>
					<p>
						<strong>Continuous Revenue:</strong>{" "}
						{segmentData.potential_continuous_revenue_stream}
					</p>
					<p>
						<strong>Segment Income:</strong>{" "}
						{segmentData.segment_income}
					</p>
				</CardWrapper>

				<CardWrapper
					icon={<Target className="h-6 w-6" />}
					title="Market Position"
					gradient="from-red-500 to-pink-500"
				>
					<p>
						<strong>Potential Beachhead:</strong>{" "}
						{segmentData.potential_beachhead}
					</p>
					<p>
						<strong>Competition Index:</strong>{" "}
						{segmentData.competition_index}
					</p>
					<Badge
						variant="secondary"
						className="mt-2 bg-white/10 text-white"
					>
						{segmentData.market_share} Market Share
					</Badge>
				</CardWrapper>

				<CardWrapper
					icon={<PieChart className="h-6 w-6" />}
					title="Financial Metrics"
					gradient="from-purple-500 to-indigo-500"
				>
					<p>
						<strong>Customer Acquisition Cost:</strong>{" "}
						{segmentData.customer_acquisition_cost}
					</p>
					<p>
						<strong>Lifetime Value:</strong>{" "}
						{segmentData.lifetime_value}
					</p>
					<p>
						<strong>Profit Margin:</strong>{" "}
						{segmentData.profit_margin}
					</p>
				</CardWrapper>

				<CardWrapper
					icon={<Zap className="h-6 w-6" />}
					title="Key Insights"
					gradient="from-pink-500 to-rose-500"
				>
					<ul className="list-disc pl-5 space-y-2">
						<li>Large global user base with high engagement</li>
						<li>Significant revenue potential from advertising</li>
						<li>
							Strong market position but highly competitive
							landscape
						</li>
						<li>
							Positive customer lifetime value to acquisition cost
							ratio
						</li>
					</ul>
				</CardWrapper>
			</div>
		</div>
	)
}

interface CardWrapperProps {
	icon: React.ReactNode
	title: string
	gradient: string
	children: React.ReactNode
}

function CardWrapper({ icon, title, gradient, children }: CardWrapperProps) {
	return (
		<Card
			className={`bg-gradient-to-br ${gradient} border-none text-white overflow-hidden`}
		>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-lg font-bold">{title}</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				<div className="mt-4 space-y-2">{children}</div>
			</CardContent>
		</Card>
	)
}
