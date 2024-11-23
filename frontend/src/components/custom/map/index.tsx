import { MapComponentProps } from "@/lib/types/map";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Map({ data }: MapComponentProps) {
    const MapComponent = useMemo(
        () => dynamic(() => import("./client"), { ssr: false }),
        [],
    );

    return (
        <section className="~h-full w-full rounded-xl overflow-clip h-[90vh]">
            <MapComponent data={data} />
        </section>
    );
}