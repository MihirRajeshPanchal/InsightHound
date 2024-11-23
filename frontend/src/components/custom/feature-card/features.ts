export type FeaturePoint = {
	title: string
	desc: string
}
export type Feature = {
	image: string
	featureTitle: string
	featurePoints: FeaturePoint[]
}

export const features: Feature[] = [
	{
		image: "/images/feature-dashboard.webp",
		featureTitle: "Market Intelligence Engine",
		featurePoints: [
			{
				title: "Real-Time Trend Analysis",
				desc: "Stay ahead with the latest market shifts and evolving trends.",
			},
			{
				title: "Competitor Mapping",
				desc: "Identify competitors' strengths, weaknesses, and market positioning.",
			},
			{
				title: "Gap Identification",
				desc: "Uncover untapped opportunities in the market.",
			},
		],
	},
	{
		image: "/images/feature-heatmap.webp",
		featureTitle: "Target Audience Finder",
		featurePoints: [
			{
				title: "Audience Profiling",
				desc: "Generate and refine your Ideal Customer Profile (ICP).",
			},
			{
				title: "Behavioral Insights",
				desc: "Understand customer needs through data-driven analysis.",
			},
			{
				title: "Custom Strategies",
				desc: "Tailored suggestions to connect with your target audience effectively.",
			},
		],
	},
	{
		image: "/images/feature-dashboard.webp",
		featureTitle: "Public Feedback Hub",
		featurePoints: [
			{
				title: "Rate & Review Startups",
				desc: "Empower users to rate startups and share honest feedback.",
			},
			{
				title: "AI-Powered Insights",
				desc: "Startups receive actionable suggestions from feedback using LLMs.",
			},
			{
				title: "Improvement Roadmaps",
				desc: "Build better products and services with clear, data-backed recommendations.",
			},
		],
	},
	{
		image: "/images/feature-heatmap.webp",
		featureTitle: "Strategic Insights Generator",
		featurePoints: [
			{
				title: "Competitor Differentiation",
				desc: "Optimize your product positioning to stand out.",
			},
			{
				title: "Adaptation Strategies",
				desc: "Get localized plans for new market entry.",
			},
			{
				title: "Product Evolution Ideas",
				desc: "Prioritize features based on market demands.",
			},
		],
	},
]
