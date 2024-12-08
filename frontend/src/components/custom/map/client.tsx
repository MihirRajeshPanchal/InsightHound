"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet-defaulticon-compatibility"
import { mapDefaults } from "@/lib/constants"
import MapUtilities from "./util"
import { HeatmapLayerFactory } from "@vgrid/react-leaflet-heatmap-layer"
import { CoordinateDataApiResponse } from "@/lib/types/api"

const HeatmapLayer = HeatmapLayerFactory<[number, number, number]>()

const MapComponent = ({ data }: { data: CoordinateDataApiResponse }) => {
	const zoom = mapDefaults.zoom
	const mappedData: [number, number, number][] = data.map((d) => [
		d.coordinates.lat,
		d.coordinates.lng,
		d.extracted_value / 100,
	])

	return (
		<MapContainer
			center={data[0].coordinates}
			zoom={zoom}
			scrollWheelZoom={true}
			dragging={true}
			style={{ height: "100%", width: "100%" }}
		>
			<TileLayer
				attribution=""
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<MapUtilities card={data[0]} />
			<Marker
				position={[data[0].coordinates.lat, data[0].coordinates.lng]}
				draggable={true}
			>
				<Popup>You&apos;re here</Popup>
			</Marker>
			{data
				// .sort((a, b) => b.extracted_value - a.extracted_value)
				// .slice(0, 20)
				.map((d, i) => (
					<Marker
						opacity={d.extracted_value / 100}
						autoPan={false}
						key={i}
						position={[d.coordinates.lat, d.coordinates.lng]}
					>
						<Popup>
							{d.extracted_value.toFixed(2)}% people interested
						</Popup>
					</Marker>
				))}
			<HeatmapLayer
				fitBoundsOnLoad
				fitBoundsOnUpdate
				radius={30}
				minOpacity={0.3}
				gradient={{
					0: "#ED16B1",
					0.1: "#9916EE",
					0.2: "#1D2FF1",
					0.4: "#00BC5C",
					0.6: "#FDD42E",
					0.8: "#DE1213",
					1: "#9F0132",
				}}
				blur={20}
				points={mappedData}
				longitudeExtractor={(m) => m[1]}
				latitudeExtractor={(m) => m[0]}
				intensityExtractor={(m) => m[2]}
			/>
		</MapContainer>
	)
}

export default MapComponent
