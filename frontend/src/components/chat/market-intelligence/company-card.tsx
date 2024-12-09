import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CompanyProfile } from "@/lib/types/chat"
import { trim } from "@/lib/utils"

export function CompanyCard({ company }: { company: CompanyProfile }) {
	return (
		<Card className="w-full max-w-6xl">
			<CardHeader>
				<div className="flex items-center space-x-4">
					<Avatar className="h-20 w-20">
						<AvatarImage
							src={company.logo || `https://avatar.vercel.sh/${company.name}.png`}
							alt={company.name}
						/>
						<AvatarFallback>
							{company.name.slice(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div>
						<CardTitle className="text-2xl">
							{company.name}
						</CardTitle>
						<CardDescription>
							{company.tagline}
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<section>
						<h3 className="font-semibold mb-2">About</h3>
						<p>{trim(company.description, 300)}</p>
					</section>

					<section>
						<h3 className="font-semibold mb-2">Key Information</h3>
						<div className="grid grid-cols-2 gap-4">
							<InfoItem label="Followers" value={company.followers_count.toString()} />
							<InfoItem label="Industry" value={company.industry.join(", ")} />
							<InfoItem label="Foundation Date" value={company.foundation_date} />
							<InfoItem label="Employee Count" value={company.employee_count.toString()} />
						</div>
					</section>

					<section>
						<h3 className="font-semibold mb-2">Locations</h3>
						<ul className="space-y-2">
							{company.locations.map((location, index) => (
								<li key={index}>
									<p>{`${location.city}${location.country ? ", " + location.country : ""}`}</p>
									{location.is_headquarter && <span className="text-sm text-gray-500">(Headquarters)</span>}
								</li>
							))}
						</ul>
					</section>

					<section>
						<h3 className="font-semibold mb-2">Activities</h3>
						<div className="flex flex-wrap gap-2">
							{company.activities.slice(0, Math.min(8, company.activities.length)).map((activity, index) => (
								<Badge key={index} variant="secondary">
									{activity}
								</Badge>
							))}
						</div>
					</section>

					<section>
						<h3 className="font-semibold mb-2">Contact</h3>
						<p>
							Website: <a href={company.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{company.website}</a>
						</p>
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
