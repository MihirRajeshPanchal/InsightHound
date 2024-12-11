"use client"

import { CompanyCard } from "../market-intelligence/company-card"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { CompanyProfile } from "@/lib/types/chat"
import useSelfCompany from "@/hooks/use-self"
import { useState } from "react"

const grid: Record<number, string> = {
	1: "grid-cols-[1fr_repeat(2,0fr)]",
	2: "grid-cols-[0fr_1fr_0fr]",
	3: "grid-cols-[repeat(2,0fr)_1fr]",
}

export default function CompetitorMapping({
	// userData,
	data,
}: {
	// userData: CompanyData
	data: CompanyProfile[]
}) {
	const [selected, setSelected] = useState(0)
	const { data: userData } = useSelfCompany()
	const selfData = userData?.data || data[0]

	return (
		<section>
			<div
				// className="compareLtoR | group | overflow-hidden p-2 grid gap-0 grid-cols-[0fr_1fr] peer-checked:grid-cols-[0fr_1fr] has-[.compCard-company:checked]:gap-4 has-[.compCard-company:checked]:grid-cols-[1fr_1fr] transition-[grid-template-columns,gap] duration-500"
				className={`compareLtoR | group | overflow-hidden p-2 grid gap-0 transition-[grid-template-columns,gap] duration-500 ${
					selected !== 0
						? "grid-cols-[1fr_1fr] gap-4"
						: "grid-cols-[0fr_1fr]"
				}`}
			>
				{selfData && (
					<div className="overflow-hidden">
						<div
							// className="competitorCard-company w-max group-has-[.compCard-company:checked]:w-full [interpolate-size:allow-keywords] transition-[width] duration-500"
							className={`competitorCard ${
								selected ? "w-full" : "w-max "
							} [interpolate-size:allow-keywords] transition-[width] duration-500`}
						>
							<button
								onClick={() => {
									setSelected(0)
								}}
								className="bg-foreground text-background font-medium rounded-md grid place-items-center w-full my-4"
							>
								<label
									htmlFor="compareBack-company"
									className="w-full h-full px-3 py-1.5"
								>
									Back
								</label>
							</button>
							<CompanyCard company={selfData} />

							{/* <input
								type="radio"
								name="compCompare-company"
								id="compareBack-company"
								className="peer hidden"
							/> */}
						</div>
					</div>
				)}
				<div
					// className="grid gap-4 grid-cols-[repeat(3,1fr)] has-[.compCard-company:checked]:gap-0 has-[#compCompareOne-company:checked]:grid-cols-[1fr_0fr_0fr] has-[#compCompareTwo-company:checked]:grid-cols-[0fr_1fr_0fr] has-[#compCompareThree-company:checked]:grid-cols-[0fr_0fr_1fr] transition-[grid-template-columns,gap] duration-500"
					className={`grid ${
						selected !== 0
							? "gap-0 " + grid[selected]
							: "gap-4 grid-cols-[repeat(3,1fr)]"
					} transition-[grid-template-columns,gap] duration-500`}
				>
					{data?.slice(1).map((item, i) => (
						<div key={i} className="overflow-hidden">
							<div
								// className="competitorCard-company"
								className={`competitorCard transition-[width] [interpolate-size:allow-keywords] duration-500  ${
									selected !== 0 && selected !== i + 1
										? "w-max"
										: "w-full"
								}`}
							>
								<button
									onClick={() => setSelected(i + 1)}
									className={cn(
										"bg-background my-4 w-full",
										buttonVariants({ variant: "default" })
									)}
								>
									Compare
								</button>
								<CompanyCard company={item} />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
