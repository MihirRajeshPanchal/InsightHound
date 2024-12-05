"use client"
import { InsightHound } from "@/assets/svgs"
// import "./loader.css"

export default function Loader() {
	return (
		<>
			<style jsx global>{`
				@property --maskColorStop {
					syntax: "<percentage>";
					initial-value: 0%;
					inherits: false;
				}

				:root {
					--loaderAccent: 32 19% 87%;
				}
				.iHoundLoader {
					/*  218px  */
					width: var(--loaderWidth, 218px);
					aspect-ratio: 0.6728;
					display: grid;
					grid-template-columns: 1fr 2.85fr 1fr;

					mask-image: radial-gradient(
						circle at bottom left,
						transparent var(--maskColorStop),
						black calc(var(--maskColorStop) + 15%)
					);
				}
				.iHoundLoader * {
					background-image: linear-gradient(
						var(--gradientDirection),
						hsl(var(--loaderAccent)),
						transparent
					);
				}
				.iHoundEar {
					--round: 8px;
					--roundLg: 75px;
					--gradientDirection: to bottom;

					mask-image: linear-gradient(
						to top,
						black var(--maskColorStop),
						transparent var(--maskColorStop)
					);
				}
				.iHoundEar:first-of-type {
					border-radius: var(--roundLg) var(--round) 0 var(--round);
				}
				.iHoundEar:last-of-type {
					border-radius: var(--round) var(--roundLg) var(--round) 0;
				}

				.iHoundI {
					--maskStopTo: 50%;
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					grid-template-rows: repeat(4, 13.88%);
					align-content: end;

					mask-image: linear-gradient(
						to right,
						transparent calc(50% - var(--maskColorStop)),
						black calc(50% - var(--maskColorStop))
							calc(50% + var(--maskColorStop)),
						transparent calc(50% + var(--maskColorStop))
					);
				}
				.iHoundI > div {
					--gradientDirection: to left;
					grid-column: 1/-1;
				}
				.iHoundI > div:nth-child(2) {
					--gradientDirection: to top;
					grid-row: 2/4;
					grid-column: 2/3;
				}

				.iHoundEar {
					animation: ears var(--loaderDuration, 5s) infinite;
				}
				.iHoundI {
					animation: I var(--loaderDuration, 5s) infinite;
				}
				.iHoundLoader {
					animation: vanish var(--loaderDuration, 5s) infinite;
				}

				@keyframes ears {
					0%,
					40% {
						--maskColorStop: 0%;
					}
					80%,
					100% {
						--maskColorStop: 100%;
					}
				}
				@keyframes I {
					35%,
					100% {
						--maskColorStop: 50%;
					}
				}
				@keyframes vanish {
					0%,
					80% {
						--maskColorStop: 0%;
					}
					95%,
					100% {
						--maskColorStop: 100%;
					}
				}

				/* Text Animation */
				.iHoundText svg {
					/*  400px  */
					width: min(90%, var(--loaderTextWidth, 218px));
					margin-inline: auto;
					height: 100%;
				}
				.iHoundText svg path {
					animation: text-svg var(--loaderDuration, 5s) linear
						infinite;
				}
				.hound path {
					stroke-dasharray: 562.86;
					stroke-dashoffset: 562.86;
				}

				.iHoundText {
					mask-image: radial-gradient(
						circle at bottom left,
						transparent var(--maskColorStop),
						black calc(var(--maskColorStop) + 15%)
					);
					animation: vanish var(--loaderDuration, 5s) infinite;
				}

				@keyframes text-svg {
					50% {
						stroke-dashoffset: 0;
						fill: transparent;
						animation-timing-function: ease-in;
					}
					80%,
					100% {
						stroke-dashoffset: 0;
						fill: hsl(var(--loaderAccent));
					}
				}
			`}</style>
			<div className="iHoundLoader">
				<div className="iHoundEar"></div>
				<div className="iHoundI">
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div className="iHoundEar"></div>
			</div>

			<div className="iHoundText">
				<InsightHound />
			</div>
		</>
	)
}
