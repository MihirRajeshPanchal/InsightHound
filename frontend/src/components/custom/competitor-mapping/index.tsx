"use client"

import { useAuth } from "@/hooks/use-auth"
import { CompanyData } from "@/lib/types/api"
import { fetchAPI } from "@/lib/utils/fetch-api"
import { useQuery } from "@tanstack/react-query"
import { CompanyCard } from "../market-intelligence/company-card"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Loading from "@/components/loading"

export default function CompetitorMapping() {
	const { user } = useAuth()
	const { data } = useQuery({
		queryKey: ["competitor-mapping", user?.id],
		queryFn: async () => {
			const response = await fetchAPI<CompanyData[]>({
				url: `/rivals/${user?.id}`,
				method: "GET",
				baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
			})
			return response.data
		},
		enabled: !!user,
	})

	const { data: userData } = useQuery({
		queryKey: ["self", user?.id],
		queryFn: async () => {
			const response = await fetchAPI<CompanyData>({
				url: `/self/${user?.id}`,
				method: "GET",
				baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
			})
			return response.data
		},
		enabled: !!user,
	})

	if (!userData || !data) {
		return <Loading />
	}
	return (
		<section>
			<div className="compareLtoR | group | overflow-hidden p-2 grid gap-0 grid-cols-[0fr_1fr] peer-checked:grid-cols-[0fr_1fr] has-[.compCard:checked]:gap-4 has-[.compCard:checked]:grid-cols-[1fr_1fr] transition-[grid-template-columns,gap] duration-500">
				{userData && (
					<div className="overflow-hidden">
						<div className="competitorCard w-max group-has-[.compCard:checked]:w-full [interpolate-size:allow-keywords] transition-[width] duration-500">
							<button className="bg-foreground text-background font-medium rounded-md grid place-items-center w-full my-4">
								<label
									htmlFor="compareBack"
									className="w-full h-full px-3 py-1.5"
								>
									Back
								</label>
							</button>
							<CompanyCard company={userData} />

							<input
								type="radio"
								name="compCompare"
								id="compareBack"
								className="peer hidden"
							/>
						</div>
					</div>
				)}
				<div className="grid gap-4 grid-cols-[repeat(3,1fr)] has-[.compCard:checked]:gap-0 has-[#compCompareOne:checked]:grid-cols-[1fr_0fr_0fr] has-[#compCompareTwo:checked]:grid-cols-[0fr_1fr_0fr] has-[#compCompareThree:checked]:grid-cols-[0fr_0fr_1fr] transition-[grid-template-columns,gap] duration-500">
					{data[0] && (
						<div className="overflow-hidden">
							<div className="competitorCard">
								<label
									htmlFor="compCompareOne"
									className={cn(
										"bg-background my-4 w-full",
										buttonVariants({ variant: "default" })
									)}
								>
									Compare
								</label>
								<CompanyCard company={data[0]} />
								<input
									type="radio"
									name="compCompare"
									id="compCompareOne"
									className="compCard | hidden"
								/>
							</div>
						</div>
					)}
					{data[1] && (
						<div className="overflow-hidden">
							<div className="competitorCard">
								<label
									htmlFor="compCompareTwo"
									className={cn(
										"bg-background my-4 w-full",
										buttonVariants({ variant: "default" })
									)}
								>
									Compare
								</label>
								<CompanyCard company={data[1]} />
								<input
									type="radio"
									name="compCompare"
									id="compCompareTwo"
									className="compCard | hidden"
								/>
							</div>
						</div>
					)}
					{data[2] && (
						<div className="overflow-hidden">
							<div className="competitorCard">
								<label
									htmlFor="compCompareThree"
									className={cn(
										"bg-background my-4 w-full",
										buttonVariants({ variant: "default" })
									)}
								>
									Compare
								</label>
								<CompanyCard company={data[2]} />

								<input
									type="radio"
									name="compCompare"
									id="compCompareThree"
									className="compCard | hidden"
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
