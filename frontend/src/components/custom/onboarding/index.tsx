"use client"

import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CloudUpload } from "lucide-react"
import { FileInput, FileUploader } from "@/components/ui/file-input"
import { fetchAPI } from "@/lib/utils/fetch-api"
import { getToken } from "@/lib/utils/token"
import { TNoParams } from "@/lib/types/common"
import { useRouter } from "next/navigation"
import { DOMAINS } from "@/lib/constants"
import React from "react"
import { useAuth } from "@/hooks/use-auth"

const formSchema = z.object({
	name: z.string(),
	vision: z.string(),
	mission: z.string(),
	valuation: z.number(),
	domain: z.string(),
	description: z.string(),
	document: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>
export default function OnboardingForm() {
	const { user } = useAuth()
	const formRef = React.useRef<HTMLFormElement>(null)

	const router = useRouter()
	const dropZoneConfig = {
		maxFiles: 5,
		maxSize: 1024 * 1024 * 4,
		multiple: true,
	}
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
	})

	async function onSubmit(values: FormValues) {
		try {
			if (!user) return
			const token = getToken()
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { document, ...rest } = values
			const res = await fetchAPI<
				TNoParams,
				TNoParams,
				Partial<FormValues>
			>({
				url: "/company",
				method: "POST",
				body: {
					...rest,
				},
				token,
			})
			if (!res.data?.error) {
				toast.success("Form submitted successfully")
				toast.success("Cooking up your dashboard!")
				await fetchAPI({
					url: `/self/${user.id}`,
					method: "GET",
					baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
				})
				router.push("/chat")
			}
		} catch (error) {
			console.error("Form submission error", error)
			toast.error("Failed to submit the form. Please try again.")
		}
	}

	async function handleUpload(file: File) {
		toast("Scanning Document!")
		const formData = new FormData()
		formData.append("document", file)
		const url = process.env.NEXT_PUBLIC_FLASK_URL
		if (!url) {
			toast.error("Server URL is not set")
			return
		}
		try {
			const res = await fetch(`${url}/onboard`, {
				method: "POST",
				body: formData,
			})
			const data = (await res.json()) as FormValues
			form.setValue("name", data.name)
			form.setValue("vision", data.vision)
			form.setValue("mission", data.mission)
			form.setValue(
				"valuation",
				parseInt(String(data.valuation).replace(/,/g, "")),
			)
			form.setValue("domain", data.domain)
			form.setValue("description", data.description)
			formRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			})
		} catch (error) {
			console.error("Document upload error", error)
			toast.error("Failed to upload the document. Please try again.")
		}
	}

	return (
		<Form {...form}>
			<form
				ref={formRef}
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 max-w-3xl mx-auto py-10 px-6"
			>
				<h1 className="text-2xl font-bold py-2">Onboarding</h1>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder="TechNova Solutions"
									type=""
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is your company display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="vision"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Vision</FormLabel>
							<FormControl>
								<Input
									placeholder="To revolutionize the way businesses interact with technology and empower global communities."
									type="text"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								A forward-looking declaration of the
								startup&apos;s long-term aspirations.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="mission"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mission</FormLabel>
							<FormControl>
								<Input
									placeholder="Our mission is to deliver cutting-edge AI-driven solutions that help startups scale efficiently and connect with their target audience."
									type=""
									{...field}
								/>
							</FormControl>
							<FormDescription>
								A concise statement outlining the startup&apos;s
								purpose.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-12 gap-4">
					<div className="col-span-6">
						<FormField
							control={form.control}
							name="valuation"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Valuation(USD)</FormLabel>
									<FormControl>
										<Input
											placeholder="120,000"
											type="number"
											{...field}
											onChange={(e) => {
												field.onChange(
													parseInt(e.target.value),
												)
											}}
										/>
									</FormControl>
									<FormDescription>
										The estimated monetary worth of the
										startup.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="col-span-6">
						<FormField
							control={form.control}
							name="domain"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Domain</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a domain" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{DOMAINS.map((domain, i) => (
												<SelectItem
													key={i}
													value={domain}
												>
													{domain}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>
										The primary sector or industry the
										startup operates in.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									rows={15}
									placeholder="A detailed overview of our startup's goals, market strategies, and product offerings."
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								A comprehensive document or summary describing
								the startup&apos;s goals.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex gap-1 items-center">
					<div className="w-full h-[1px] bg-white" />
					OR
					<div className="w-full h-[1px] bg-white" />
				</div>
				<FormField
					control={form.control}
					name="document"
					render={() => (
						<FormItem>
							<FormLabel>Document</FormLabel>
							<FormControl>
								<FileUploader
									value={[]}
									onValueChange={(files) => {
										const file = files?.[0]
										if (!file) return
										handleUpload(file)
									}}
									dropzoneOptions={dropZoneConfig}
									className="relative bg-background rounded-lg p-2"
								>
									<FileInput
										id="fileInput"
										className="outline-dashed outline-1 outline-slate-500"
									>
										<div className="flex items-center justify-center flex-col p-8 w-full ">
											<CloudUpload className="text-gray-500 w-10 h-10" />
											<p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
												<span className="font-semibold">
													Click to upload
												</span>
												&nbsp; or drag and drop
											</p>
											<p className="text-xs text-gray-500 dark:text-gray-400">
												PDF or DOC
											</p>
										</div>
									</FileInput>
									{/* <FileUploaderContent>
                                        {files &&
                                            files.length > 0 &&
                                            files.map((file, i) => (
                                                <FileUploaderItem key={i} index={i}>
                                                    <Paperclip className="h-4 w-4 stroke-current" />
                                                    <span>{file.name}</span>
                                                </FileUploaderItem>
                                            ))}
                                    </FileUploaderContent> */}
								</FileUploader>
							</FormControl>
							<FormDescription>
								A comprehensive document or summary describing
								the startup&apos;s goals.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}
