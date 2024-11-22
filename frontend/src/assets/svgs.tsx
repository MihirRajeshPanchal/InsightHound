import { SVGAttributes } from "react"

export const RightArrow = (props: SVGAttributes<SVGElement>) => (
	<svg
		width="25"
		height="25"
		viewBox="0 0 25 25"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M5.5 12.5H19.5"
			stroke="#E4DED8"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M12.5 5.5L19.5 12.5L12.5 19.5"
			stroke="#E4DED8"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)
