"use client"

import {
	Bar,
	BarChart,
	Cell,
	Pie,
	PieChart,
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import { MockResponse } from "@/lib/types/api"
import { SurveyResponses } from "@/lib/types/chat"

const COLORS = [
	"hsl(var(--chart-1))",
	"hsl(var(--chart-2))",
	"hsl(var(--chart-3))",
	"hsl(var(--chart-4))",
]

function convertSurveyData(input: SurveyResponses): MockResponse[] {
	return input.map(({ question_text, options }) => {
		const totalVotes = Object.values(options).reduce(
			(sum, count) => sum + count,
			0,
		)
		return {
			questionText: question_text,
			responses: Object.entries(options).map(([option, count]) => ({
				option,
				percentage: totalVotes > 0 ? (count / totalVotes) * 100 : 0,
			})),
		}
	})
}

export default function SurveyResultsCharts({
	data,
}: {
	data: SurveyResponses
}) {
	const surveyData = convertSurveyData(data)
	return (
		<div className="space-y-8">
			{surveyData.map((question, questionIndex) => {
				const chartConfig = question.responses.reduce(
					(acc, response, index) => {
						acc[response.option] = {
							label: response.option,
							color: COLORS[index % COLORS.length],
						}
						return acc
					},
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					{} as any,
				)

				return (
					<div key={questionIndex} className="space-y-4 ">
						<h2 className="text-2xl font-bold">
							{question.questionText}
						</h2>
						<div
							key={questionIndex}
							className="space-y-4 grid grid-cols-3 gap-4"
						>
							{/* Bar Chart */}
							<Card>
								<CardHeader>
									<CardTitle>Bar Chart</CardTitle>
								</CardHeader>
								<CardContent>
									<ChartContainer
										config={chartConfig}
										className="h-full"
									>
										<ResponsiveContainer
											width="100%"
											height="100%"
										>
											<BarChart data={question.responses}>
												<ChartTooltip
													content={
														<ChartTooltipContent />
													}
												/>
												<Bar dataKey="percentage">
													{question.responses.map(
														(entry, index) => (
															<Cell
																key={`cell-${index}`}
																fill={
																	COLORS[
																		index %
																			COLORS.length
																	]
																}
															/>
														),
													)}
												</Bar>
											</BarChart>
										</ResponsiveContainer>
									</ChartContainer>
								</CardContent>
							</Card>

							{/* Pie Chart */}
							<Card>
								<CardHeader>
									<CardTitle>Pie Chart</CardTitle>
								</CardHeader>
								<CardContent>
									<ChartContainer
										config={chartConfig}
										className="h-full"
									>
										<ResponsiveContainer
											width="100%"
											height="100%"
										>
											<PieChart>
												<Pie
													data={question.responses}
													dataKey="percentage"
													nameKey="option"
													cx="50%"
													cy="50%"
													outerRadius={80}
													label
												>
													{question.responses.map(
														(entry, index) => (
															<Cell
																key={`cell-${index}`}
																fill={
																	COLORS[
																		index %
																			COLORS.length
																	]
																}
															/>
														),
													)}
												</Pie>
												<ChartTooltip
													content={
														<ChartTooltipContent />
													}
												/>
											</PieChart>
										</ResponsiveContainer>
									</ChartContainer>
								</CardContent>
							</Card>

							{/* Radar Chart */}
							<Card>
								<CardHeader>
									<CardTitle>Radar Chart</CardTitle>
								</CardHeader>
								<CardContent>
									<ChartContainer
										config={chartConfig}
										className="h-full"
									>
										<ResponsiveContainer
											width="100%"
											height="100%"
										>
											<RadarChart
												cx="50%"
												cy="50%"
												outerRadius="80%"
												data={question.responses}
											>
												<PolarGrid />
												<PolarAngleAxis dataKey="option" />
												<PolarRadiusAxis />
												<Radar
													name="Percentage"
													dataKey="percentage"
													stroke={COLORS[0]}
													fill={COLORS[0]}
													fillOpacity={0.6}
												/>
												<ChartTooltip
													content={
														<ChartTooltipContent />
													}
												/>
											</RadarChart>
										</ResponsiveContainer>
									</ChartContainer>
								</CardContent>
							</Card>
						</div>
					</div>
				)
			})}
		</div>
	)
}
