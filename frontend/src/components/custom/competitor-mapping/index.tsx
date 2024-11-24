"use client"

import { useAuth } from "@/hooks/use-auth"
import { CompetitorMappingApiResponse } from "@/lib/types/api"
import { fetchAPI } from "@/lib/utils/fetch-api"
import { useQuery } from "@tanstack/react-query"

export default function CompetitorMapping() {
	const { user } = useAuth()
	const { data } = useQuery({
		queryKey: ["competitor-mapping", user?.id],
		queryFn: async () => {
			const response = await fetchAPI<CompetitorMappingApiResponse>({
				url: `/rivals/${user?.id}`,
				method: "GET",
				baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
			})
			return response
		},
		enabled: !!user,
	})

	const { data: userData } = useQuery({
		queryKey: ["self", user?.id],
		queryFn: async () => {
			const response = await fetchAPI({
				url: `/self/${user?.id}`,
				method: "GET",
				baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
			})
			return response
		},
		enabled: !!user,
	})

	console.log({ data, user, userData })
	return (
		<section className="grow">
			<button className="bg-text text-background font-medium rounded-md grid place-items-center">
				<label
					htmlFor="compareBack"
					className="w-full h-full px-3 py-1.5"
				>
					Back
				</label>
			</button>
			<input
				type="radio"
				name="compCompare"
				id="compareBack"
				className="peer hidden"
			/>
			<div className="compareLtoR | p-2 h-full ~bg-red-300 grid gap-2 grid-cols-[0fr_1fr] peer-checked:grid-cols-[0fr_1fr] has-[.compCard:checked]:grid-cols-[1fr_1fr] transition-[grid-template-columns] duration-500">
				<div className="overflow-hidden">
					<div className="competitorCard | h-full~ p-4 rounded-xl border-2 border-text/20 bg-black">
						<h2>My Company</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Laborum, doloribus! Cumque nemo delectus
							laudantium et error. Sint, asperiores. Totam enim
							soluta quos eaque minus suscipit!
						</p>
					</div>
				</div>
				<div className="grid gap-4 grid-cols-[repeat(3,1fr)] has-[#compCompareOne:checked]:grid-cols-[1fr_repeat(2,0fr)] has-[#compCompareTwo:checked]:grid-cols-[0fr_1fr_0fr] has-[#compCompareThree:checked]:grid-cols-[repeat(2,0fr)_1fr]">
					<div className="overflow-hidden">
						<div className="competitorCard | h-full~ p-4 rounded-xl border-2 border-text/20 bg-black">
							<h2>Competitor Title</h2>
							<p>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Laborum, doloribus! Cumque
								nemo delectus laudantium et error. Sint,
								asperiores. Totam enim soluta quos eaque minus
								suscipit!
							</p>
							<label
								htmlFor="compCompareOne"
								className="bg-background p-4"
							>
								Compare
							</label>
							<input
								type="radio"
								name="compCompare"
								id="compCompareOne"
								className="compCard | hidden"
							/>
						</div>
					</div>
					<div className="overflow-hidden">
						<div className="competitorCard | h-full~ p-4 rounded-xl border-2 border-text/20 bg-black">
							<h2>Competitor Title</h2>
							<p>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Laborum, doloribus! Cumque
								nemo delectus laudantium et error. Sint,
								asperiores. Totam enim soluta quos eaque minus
								suscipit!
							</p>
							<label
								htmlFor="compCompareTwo"
								className="bg-background p-4"
							>
								Compare
							</label>
							<input
								type="radio"
								name="compCompare"
								id="compCompareTwo"
								className="compCard | hidden"
							/>
						</div>
					</div>
					<div className="overflow-hidden">
						<div className="competitorCard | h-full~ p-4 rounded-xl border-2 border-text/20 bg-black">
							<h2>Competitor Title</h2>
							<p>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Laborum, doloribus! Cumque
								nemo delectus laudantium et error. Sint,
								asperiores. Totam enim soluta quos eaque minus
								suscipit!
							</p>
							<label
								htmlFor="compCompareThree"
								className="bg-background p-4"
							>
								Compare
							</label>
							<input
								type="radio"
								name="compCompare"
								id="compCompareThree"
								className="compCard | hidden"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
