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
    Button
} from "@/components/ui/button"
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

const formSchema = z.object({
    linkedin_urls: z.array(z.string()).nonempty("Please at least one item"),
    domain: z.string()
});

export default function AudienceOutreachForm() {

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
            toast.loading("Sending outreach messages on linkedin...");
            await fetchAPI({
                url: "/linkedin",
                method: "POST",
                body: {
                    linkedin_urls: values.linkedin_urls,
                    domain: values.domain,
                    user_id: user.id
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
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}