import { InsightHound } from "@/assets/svgs"
import "./loader.css"

export default function Loader() {
	return (
		<>
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
