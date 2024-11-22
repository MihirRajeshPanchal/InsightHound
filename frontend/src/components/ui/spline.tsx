"use client"

import Spline from "@splinetool/react-spline";

export default function SplineObj({ url }: { url: string }) {
    return (
        <div className="overflow-hidden size-full">
            <Spline scene={url} />
        </div>
    );
}