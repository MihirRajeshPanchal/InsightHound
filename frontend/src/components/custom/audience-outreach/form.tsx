"use client"
import {
    toast
} from "sonner"
import {
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    TagsInput
} from "@/components/ui/tags-input"
import {
    Input
} from "@/components/ui/input"
import { fetchAPI } from "@/lib/utils/fetch-api"
import { useAuth } from "@/hooks/use-auth"
import { Textarea } from "@/components/ui/textarea"
import React from "react"
import { RainbowButton } from "@/components/ui/rainbow-button"

const formSchema = z.object({
    linkedin_urls: z.array(z.string()).nonempty("Please at least one item"),
    domain: z.string()
});

export default function AudienceOutreachForm() {
    const [message, setMessage] = React.useState<string>("");
    const [generated, setGenerated] = React.useState<boolean>(false);
    const { user } = useAuth();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            linkedin_urls: []
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!user) return;
        try {
            toast.loading("Generating outreach messages for linkedin...");
            const resp = await fetchAPI({
                url: "/generate_linkedin",
                method: "POST",
                body: {
                    linkedin_urls: values.linkedin_urls,
                    domain: values.domain,
                    user_id: user.id
                },
                baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
            })
            setGenerated(true);
            setMessage(resp.data?.detail || "");
            toast.success("Outreach messages generated!");

        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }

    async function onSend() {
        if (!user) return;
        const values = form.getValues();
        try {
            toast.loading("Sending outreach messages on linkedin...");
            await fetchAPI({
                url: "/send_linkedin",
                method: "POST",
                body: {
                    linkedin_urls: values.linkedin_urls,
                    domain: values.domain,
                    user_id: user.id,
                    message
                },
                baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
            })
            toast.success("Outreach messages sent on linkedin!");

        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                    <FormField
                        control={form.control}
                        name="linkedin_urls"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Linkedin URLs</FormLabel>
                                <FormControl>
                                    <TagsInput
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        placeholder="Enter your linkedin urls"
                                    />
                                </FormControl>
                                <FormDescription>Add linkedin urls you want to connect to</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="domain"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Domain</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="www.varad.xyz"

                                        type="text"
                                        {...field} />
                                </FormControl>
                                <FormDescription>This is your public domain.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {!generated && <RainbowButton className="w-full" type="submit">Generate Message</RainbowButton>}
                </form>
            </Form>
            {generated &&
                <div className="flex flex-col gap-4 max-w-3xl mx-auto">
                    <Textarea value={message} rows={25} onChange={(e) => setMessage(e.target.value)} />
                    <RainbowButton className="w-full" onClick={onSend}>Send Message</RainbowButton>
                </div>
            }
        </>
    )
}