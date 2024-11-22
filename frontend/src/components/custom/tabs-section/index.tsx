"use client"

import { Tabs } from "./ui"

export function TabsDemo() {
	const tabs = [
		{
			title: "Flow",
			value: "flow",
			content: (
				<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
					<p>Make your project using CVA</p>
					<DummyContent src="https://res.cloudinary.com/db670bhmc/image/upload/v1701884943/261871987-3e2ebf34-26d5-4928-b823-d388ba6ad033_owejvn.png" />
				</div>
			),
		},
		{
			title: "Form",
			value: "form",
			content: (
				<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-green-700 to-cyan-900">
					<p>Make your project using CVA</p>
					<DummyContent src="https://res.cloudinary.com/db670bhmc/image/upload/v1701884428/273680147-0fce0b09-6e46-431e-ac83-e32073881ce8_uwc9d9.png" />
				</div>
			),
		},
		{
			title: "JSON",
			value: "json",
			content: (
				<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-yellow-700 to-orange-900">
					<p>Make your project using CVA</p>
					<DummyContent src="https://res.cloudinary.com/db670bhmc/image/upload/v1701884482/273757420-c09d5be3-ecbe-47e5-b16a-212ceaaf4fdc_iqtu6o.jpg" />
				</div>
			),
		},
		{
			title: "Docs",
			value: "docs",
			content: (
				<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-700 to-violet-900">
					<p>Make your project using CVA</p>
					<DummyContent src="https://res.cloudinary.com/db670bhmc/image/upload/v1701884680/261869662-b715a9ca-4d01-42cb-b827-b5acb69d2d8e_avtntm.png" />
				</div>
			),
		},
	]

	return (
		<div
			id="tabs-demo"
			className="h-[20rem] md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-12 "
		>
			<Tabs tabs={tabs} />
		</div>
	)
}

const DummyContent = ({ src }: { src: string }) => {
	return (
		<img
			src={src}
			alt={src}
			loading="lazy"
			width="1000"
			height="1000"
			className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
		/>
	)
}
