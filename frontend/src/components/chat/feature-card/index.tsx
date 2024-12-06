import React from "react"
import { Feature } from "./features"

export default function FeatureCard({ item }: { item: Feature }) {
	return (
		<div className="featureCard | group | lg:grid gap-8 grid-flow-col-dense place-items-center odd:grid-cols-[1fr,1.5fr] even:grid-cols-[1.5fr,1fr] w-[min(100%_-_2rem,1366px)] mx-auto bg-text/10 border-[3px] border-text/20 rounded-[2rem] lg:rounded-[3rem] p-4">
			<div className="space-y-4 p-4">
				<h3 className="text-xl lg:text-4xl font-bold">
					{item.featureTitle}
				</h3>
				<ul className="space-y-2">
					{item.featurePoints.map((item, idx) => (
						<li key={idx}>
							<p className="lg:text-2xl font-light">
								<span className="font-semibold">
									{item.title}:{" "}
								</span>
								{item.desc}
							</p>
						</li>
					))}
				</ul>
			</div>
			<img
				src={item.image}
				alt="Feature Image"
				className="select-none [user-drag:none] rounded-2xl lg:rounded-[2rem] group-even:col-start-1"
			/>
		</div>
	)
}
