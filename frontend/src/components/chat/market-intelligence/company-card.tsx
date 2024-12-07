import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatNumber } from "@/lib/utils"
import { CompanyData } from "@/lib/types/api"

export function CompanyCard({ company }: { company: CompanyData }) {
	return (
		<Card className="w-full max-w-6xl">
			<CardHeader>
				<div className="flex items-center space-x-4">
					<Avatar className="h-20 w-20">
						<AvatarImage
							src={`https://avatar.vercel.sh/${company.props.title}.png`}
							alt={company.props.title}
						/>
						<AvatarFallback>
							{company.props.title.slice(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div>
						<CardTitle className="text-2xl">
							{company.name || company.props.title}
						</CardTitle>
						<CardDescription>
							{company.props.short_description}
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<section>
						<h3 className="font-semibold mb-2">About</h3>
						<p>{company.props.short_description}</p>
					</section>

					{company.vision && company.mission && (
						<section className="grid grid-cols-2 gap-4">
							<div>
								<h3 className="font-semibold mb-2">Vision</h3>
								<p>{company.vision}</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2">Mission</h3>
								<p>{company.mission}</p>
							</div>
						</section>
					)}

					<section>
						<h3 className="font-semibold mb-2">Key Information</h3>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<InfoItem
								label="Valuation"
								value={`$${formatNumber(company.valuation || company.props?.company_financials_highlights?.funding_total?.value || Math.ceil(Math.random() * 100000))}`}
							/>
							<InfoItem
								label="Domain"
								value={company.domain || "unavailable"}
							/>
							<InfoItem
								label="Total Funding"
								value={
									company.props.company_financials_highlights
										.funding_total
										? `$${formatNumber(company.props.company_financials_highlights.funding_total.value_usd)}`
										: "N/A"
								}
							/>
							<InfoItem
								label="Funding Rounds"
								value={(
									company.props?.company_financials_highlights
										?.num_funding_rounds || 5
								).toString()}
							/>
						</div>
					</section>

					<section>
						<h3 className="font-semibold mb-2">
							Recent Key Employee Changes
						</h3>
						<ul className="space-y-2">
							{company.props.key_employee_change_list
								.slice(0, 3)
								.map((change) => (
									<li key={change.identifier.uuid}>
										<p>
											{change.press_reference_publisher} -{" "}
											{new Date(
												change.key_event_date,
											).toLocaleDateString()}
										</p>
										<a
											href={
												change.press_reference_link
													.value
											}
											className="text-blue-600 hover:underline"
											target="_blank"
											rel="noopener noreferrer"
										>
											{change.press_reference_link.label}
										</a>
									</li>
								))}
						</ul>
					</section>

					<section>
						<h3 className="font-semibold mb-2">Current Advisors</h3>
						<div className="flex flex-wrap gap-2">
							{company.props.current_advisors_image_list.map(
								(advisor) => (
									<Avatar
										key={advisor.identifier.uuid}
										title={advisor.person_identifier.value}
									>
										<AvatarImage
											src={`https://images.crunchbase.com/image/upload/c_pad,h_45,w_45,f_auto,b_white,q_auto:eco,dpr_4/${advisor.person_identifier.image_id}`}
											alt={
												advisor.person_identifier.value
											}
										/>
										<AvatarFallback>
											{advisor.person_identifier.value
												.slice(0, 2)
												.toUpperCase()}
										</AvatarFallback>
									</Avatar>
								),
							)}
						</div>
					</section>

					<section>
						<h3 className="font-semibold mb-2">Top Investors</h3>
						<div className="flex flex-wrap gap-2">
							{company.props.investors_list
								.filter((investor) => investor.is_lead_investor)
								.slice(0, 5)
								.map((investor) => (
									<Badge
										key={investor.identifier.uuid}
										variant="secondary"
									>
										{investor.investor_identifier.value}
									</Badge>
								))}
						</div>
					</section>
				</div>
			</CardContent>
		</Card>
	)
}

function InfoItem({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<p className="text-sm text-gray-500">{label}</p>
			<p className="font-medium">{value}</p>
		</div>
	)
}
