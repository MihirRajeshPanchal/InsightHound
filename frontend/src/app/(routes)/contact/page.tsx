import ArcCard from "@/components/custom/contact/arc-card"
import GridBackground from "@/components/custom/contact/grid-bg"
import NavbarLanding from "@/components/custom/navbar/landing"
import React from "react"

export default function Page() {
	const members = [
		{
			name: "Varad Prabhu",
			title: "the web guy",
			url: "https://www.linkedin.com/in/varadprabhu/",
			college: "TYBTECH, Mumbai",
			img: "/images/contact/varad.jpg",
		},
		{
			name: "Milind Pithadia",
			title: "the css guy",
			url: "https://www.linkedin.com/in/milindpithadia/",
			college: "TYBTECH, Mumbai",
			img: "/images/contact/milind.jpg",
		},
		{
			name: "Srinath Reddy",
			title: "the ml guy",
			url: "https://www.linkedin.com/in/srinath-reddy-8659a9290/",
			college: "TYBTECH, Mumbai",
			img: "/images/contact/srinath.jpeg",
		},
		{
			name: "Mihir Panchal",
			title: "also the ml guy",
			url: "https://www.linkedin.com/in/mihirpanchal54/",
			college: "TYBTECH, Mumbai",
			img: "/images/contact/mihir.jpeg",
		},
	]
	return (
		<div className="min-h-screen grid *:[grid-area:1/-1]">
			<GridBackground />
			<div className="gridBgFade | h-screen sticky top-0 z-10"></div>
			<div className="wrapper | z-20 max-w-screen-[1440px] relative flex flex-col justify-center min-h-screen items-center">
				<NavbarLanding />
				<h1 className="font-bold text-2xl pt-[calc(62px+3rem)] lg:pt-6">
					The gang
				</h1>
				<div className=" w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 py-12 px-12 gap-8 place-items-center">
					{members.map((member, index) => (
						<ArcCard
							key={index}
							name={member.name}
							title={member.title}
							url={member.url}
							college={member.college}
							img={member.img}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
