import { mapDefaults } from "@/lib/constants";
import { MapProps } from "@/lib/types/map";
import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function MapUtilities({ card }: MapProps) {
    const map = useMap();
    useEffect(() => {
        map.setView([card.coord.lat, card.coord.lng], mapDefaults.zoom);
    }, [card, map]);
    return <></>;
}