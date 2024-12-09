import { cn, convertMarkdownToHtml } from "@/lib/utils"
import React, { HTMLAttributes } from "react"

export default function MdBlock(
	props: HTMLAttributes<HTMLDivElement> & { md: string },
) {
	return (
		<div
			dangerouslySetInnerHTML={{
				__html: convertMarkdownToHtml(props.md),
			}}
			{...props}
			className={cn("whitespace-pre-wrap md-block", props.className)}
		/>
	)
}
