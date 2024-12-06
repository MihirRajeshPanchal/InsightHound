import { mapDefaults } from "@/lib/constants"
import { CoordinateData } from "@/lib/types/api"
import React, { useEffect } from "react"
import { useMap } from "react-leaflet"

export default function MapUtilities({ card }: { card: CoordinateData }) {
	const map = useMap()
	useEffect(() => {
		map.setView(
			[card.coordinates.lat, card.coordinates.lng],
			mapDefaults.zoom,
		)
	}, [card, map])
	return <></>
}
