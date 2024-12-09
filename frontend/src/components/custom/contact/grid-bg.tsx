import StyleJSX from "@/components/wrappers/style"
import React from "react"

export default function GridBackground() {
    return (
        <>

            <div className="gridBgWrapper | h-screen sticky top-0 z-0">
                <StyleJSX styleString={``} />
                <div className="gridBg | bg-background | before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-screen before:aspect-square"></div>
            </div>
        </>

    )
}