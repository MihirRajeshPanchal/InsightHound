import { Products } from "@/lib/types/api"
import React, { useState } from "react"
import ProductCard from "./card"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
interface CardProps {
	data: Products
}

const grid: Record<number, string> = {
	1: "grid-cols-[1fr_repeat(2,0fr)]",
	2: "grid-cols-[0fr_1fr_0fr]",
	3: "grid-cols-[repeat(2,0fr)_1fr]",
}

export default function ProductCards({ data }: CardProps) {
	const [selected, setSelected] = useState(0)

	return (
		<section
			id="product-comparison"
			className={cn(
				"grow transition-all delay-500 duration-500 ~min-h-[70vh]",
				data ? "opacity-100" : "opacity-0"
			)}
		>
			<div
				className={`compareLtoR | group | overflow-hidden p-2 grid gap-0 transition-[grid-template-columns,gap] duration-500 ${
					selected !== 0
						? "grid-cols-[1fr_1fr] gap-4"
						: "grid-cols-[0fr_1fr]"
				}`}
			>
				{data?.[0] && (
					<div className="overflow-hidden">
						<div
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
									htmlFor="compareBack"
									className="w-full h-full px-3 py-1.5"
								>
									Back
								</label>
							</button>
							<ProductCard data={data[0]} />

							{/* <input
								type="radio"
								name="compCompare"
								id="compareBack"
								className="peer hidden"
							/> */}
						</div>
					</div>
				)}

				<div
					className={`grid ${
						selected !== 0
							? "gap-0 " + grid[selected]
							: "gap-4 grid-cols-[repeat(3,1fr)]"
					} transition-[grid-template-columns,gap] duration-500`}
				>
					{data?.slice(1).map((item, i) => (
						<div key={i} className="overflow-hidden">
							<div
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
								<ProductCard data={item} />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
