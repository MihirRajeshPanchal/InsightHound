"use client"

import { CompanyCard } from "../market-intelligence/company-card"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { CompanyProfile } from "@/lib/types/chat"
import useSelfCompany from "@/hooks/use-self"

export default function CompetitorMapping({
	// userData,
	data,
}: {
	// userData: CompanyData
	data: CompanyProfile[]
}) {
	const { data: userData } = useSelfCompany()
	const selfData = userData?.props || data[0]

	console.log({ userData })
	return (
		<section>
			<div className="compareLtoR | group | overflow-hidden p-2 grid gap-0 grid-cols-[0fr_1fr] peer-checked:grid-cols-[0fr_1fr] has-[.compCard-company:checked]:gap-4 has-[.compCard-company:checked]:grid-cols-[1fr_1fr] transition-[grid-template-columns,gap] duration-500">
				{selfData && (
					<div className="overflow-hidden">
						<div className="competitorCard-company w-max group-has-[.compCard-company:checked]:w-full [interpolate-size:allow-keywords] transition-[width] duration-500">
							<button className="bg-foreground text-background font-medium rounded-md grid place-items-center w-full my-4">
								<label
									htmlFor="compareBack-company"
									className="w-full h-full px-3 py-1.5"
								>
									Back
								</label>
							</button>
							<CompanyCard company={selfData} />

							<input
								type="radio"
								name="compCompare-company"
								id="compareBack-company"
								className="peer hidden"
							/>
						</div>
					</div>
				)}
				<div className="grid gap-4 grid-cols-[repeat(3,1fr)] has-[.compCard-company:checked]:gap-0 has-[#compCompareOne-company:checked]:grid-cols-[1fr_0fr_0fr] has-[#compCompareTwo-company:checked]:grid-cols-[0fr_1fr_0fr] has-[#compCompareThree-company:checked]:grid-cols-[0fr_0fr_1fr] transition-[grid-template-columns,gap] duration-500">
					{data[0] && (
						<div className="overflow-hidden">
							<div className="competitorCard-company">
								<label
									htmlFor="compCompareOne-company"
									className={cn(
										"bg-background my-4 w-full",
										buttonVariants({ variant: "default" }),
									)}
								>
									Compare
								</label>
								<CompanyCard company={data[0]} />
								<input
									type="radio"
									name="compCompare-company"
									id="compCompareOne-company"
									className="compCard-company | hidden"
								/>
							</div>
						</div>
					)}
					{data[1] && (
						<div className="overflow-hidden">
							<div className="competitorCard-company">
								<label
									htmlFor="compCompareTwo-company"
									className={cn(
										"bg-background my-4 w-full",
										buttonVariants({ variant: "default" }),
									)}
								>
									Compare
								</label>
								<CompanyCard company={data[1]} />
								<input
									type="radio"
									name="compCompare-company"
									id="compCompareTwo-company"
									className="compCard-company | hidden"
								/>
							</div>
						</div>
					)}
					{data[2] && (
						<div className="overflow-hidden">
							<div className="competitorCard-company">
								<label
									htmlFor="compCompareThree-company"
									className={cn(
										"bg-background my-4 w-full",
										buttonVariants({ variant: "default" }),
									)}
								>
									Compare
								</label>
								<CompanyCard company={data[2]} />

								<input
									type="radio"
									name="compCompare-company"
									id="compCompareThree-company"
									className="compCard-company | hidden"
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
