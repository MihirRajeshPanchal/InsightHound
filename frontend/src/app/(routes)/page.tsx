import { RightArrow } from "@/assets/svgs"
import Lenis from "@/components/wrappers/lenis"

export default function Landing() {
	return (
		<Lenis>
			<div className="landingWrapper | relative">
				<header className="fixed top-7 left-1/2 -translate-x-1/2 w-[min(768px,100%_-_1rem)] px-8 py-3 flex justify-between rounded-full bg-black/20 backdrop-blur-xl backdrop-saturate-150 border border-text/20">
					<img src="logo.png" alt="Logo" className="w-full max-w-6" />
					<nav className="content-center">
						<ul className="flex items-center gap-4 lg:gap-8">
							<li className="text-lg font-medium">Home</li>
							<li className="text-lg ~font-medium text-text/65">
								About us
							</li>
							<li className="text-lg ~font-medium text-text/65">
								Services
							</li>
						</ul>
					</nav>
				</header>
				<main className="">
					<section className="hero | relative overflow-clip px-4 min-h-svh grid gap-6 place-content-center justify-items-center">
						<div className="ignoreThisDiv | absolute w-[15vw] min-w-40 aspect-[10] [--aspect:0.25] animate-[aspectAnimate_1.5s_forwards] rounded-[100%] skew-x-[30deg] top-0 -translate-y-1/2 left-0 -translate-x-1/2 bg-[radial-gradient(hsl(0,0%,100%,15%),hsl(0,0%,100%,0%))] blur-[96px]"></div>
						<div className="ignoreThisDiv | absolute w-[15vw] min-w-40 aspect-[10] [--aspect:0.25] animate-[aspectAnimate_1.5s_forwards] rounded-[100%] -skew-x-[30deg] top-0 -translate-y-2/3 right-0 translate-x-1/2 bg-[radial-gradient(hsl(0,0%,100%,15%),hsl(0,0%,100%,0%))] blur-[96px]"></div>

						<div className="heroChips | flex flex-wrap justify-center gap-2 items-center">
							<span className="text-xs lg:text-base px-3 py-1 bg-[radial-gradient(hsl(var(--text)/20%),hsl(var(--text)/0%))] border border-text/20 rounded-full">
								Tracking Trends
							</span>
							<span className="text-xs lg:text-base px-3 py-1 bg-[radial-gradient(hsl(var(--text)/20%),hsl(var(--text)/0%))] border border-text/20 rounded-full">
								Spotting Gaps
							</span>
							<span className="text-xs lg:text-base px-3 py-1 bg-[radial-gradient(hsl(var(--text)/20%),hsl(var(--text)/0%))] border border-text/20 rounded-full">
								Driving Growth
							</span>
						</div>
						<h1 className="text-4xl lg:text-8xl font-medium bg-[radial-gradient(hsl(var(--text)),#7E7B77)] text-transparent bg-clip-text">
							InsightHound
						</h1>
						<p className="text-lg lg:text-2xl max-w-prose text-center">
							Leverage AI and data analytics to uncover market
							opportunities, analyze competitors, and connect with
							your target audience like never before.
						</p>
						<button className="group | grid *:[grid-area:1/-1] border border-text/20 rounded-full ">
							<div className="grid h-full grid-cols-[calc(100%_-_55px)_1fr] group-hover:grid-cols-[0%_1fr] transition-[grid-template-columns] duration-300">
								<span className="col-start-2 bg-accent rounded-full"></span>
							</div>
							<span className="grid gap-6 place-items-center grid-cols-[1fr_auto] text-2xl font-medium px-4 py-2">
								Get Started
								<RightArrow className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
							</span>
						</button>
					</section>
				</main>
			</div>
		</Lenis>
	)
}
