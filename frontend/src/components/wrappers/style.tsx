"use client"
import React, { HTMLAttributes } from "react"

export default function StyleJSX(
	props: HTMLAttributes<HTMLStyleElement> & { styleString: string },
) {
	return (
		<>
			<style jsx {...props}>
				{`
					${props.styleString}
				`}
			</style>
		</>
	)
}
