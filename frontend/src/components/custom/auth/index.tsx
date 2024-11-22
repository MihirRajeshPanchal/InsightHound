"use client"
import { IconBrandAppleFilled, IconBrandGoogleFilled } from '@tabler/icons-react'
import { Account } from './account'
import { useForm, UseFormReturn } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { fetchAPI } from '@/lib/utils/fetch-api'
import { TNoParams } from '@/lib/types/common'
import { useRouter } from 'next/navigation'
import React from 'react'
import { user } from '@prisma/client'
import { setToken } from '@/lib/utils/token'
import BackButton from '@/components/ui/back-button'

type FormType = {
    email: string
    password: string
}

export const Auth = () => {
    const [tab, setTab] = React.useState<0 | 1>(0)
    const router = useRouter();
    const form = useForm<FormType>({
        defaultValues: {
            email: '',
            password: ''
        }
    })
    async function onSubmit(data: FormType) {
        console.log({ data })
        const resp = await fetchAPI<{
            token: string
            user: user
        }, TNoParams, FormType>({
            url: tab === 0 ? "/user/login" : "/user/signup",
            method: "POST",
            body: data
        })
        if (resp.data?.token) {
            setToken(resp.data.token)
            router.push("/dashboard")
        }
    }
    return (
        <>
            <BackButton className="w-fit mt-24 ml-24" />
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col items-center justify-start px-24">
                <Account firstTab={<Tab1 form={form} />} secondTab={<Tab2 form={form} />} currentTab={tab} setCurrentTab={setTab} />
            </form>
        </>
    )
}

const Tab1 = ({ form }: { form: UseFormReturn<FormType> }) => (
    <div className="flex w-full flex-col items-start justify-start gap-4 rounded-xl p-3 pb-4">
        <div>
            <h1 className="font-font text-lg">Sign in to your account</h1>
        </div>
        <div className="w-full">
            <Label htmlFor="email" className="text-sm">
                Email
            </Label>
            <Input
                placeholder="milindpithadia@gmail.com"
                type="text"
                className="mt-1 h-10 w-full rounded-md border px-1 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-neutral-800 dark:border-neutral-800 dark:placeholder-neutral-500"
                {...form.register('email')}
            />
        </div>
        <div className="w-full">
            <Label htmlFor="password" className="text-sm">
                Password
            </Label>
            <Input
                type="password"
                placeholder="Password"
                className="mt-1 h-10 w-full rounded-md border px-1 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-neutral-800 dark:border-neutral-800 dark:placeholder-neutral-500"
                {...form.register('password')}
            />
        </div>
        <div className="mt-2.5 w-full">
            <Button type="submit" className="h-10 w-full rounded-md bg-neutral-900 font-medium text-white dark:bg-white dark:text-neutral-950">
                Submit
            </Button>
        </div>

        <div className="relative mt-6 w-full">
            <div className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-neutral-400 dark:bg-black dark:text-neutral-500">
                Or
            </div>
            <div className="border-b border-neutral-300 dark:border-neutral-800"></div>
        </div>
        <div className="mt-6 flex w-full flex-col gap-4">
            <Button type="button" className="font-regular flex h-10 w-full items-center justify-center gap-2 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-950">
                <IconBrandGoogleFilled /> <div>Continue with Google</div>
            </Button>
            <Button type="button" className="font-regular flex h-10 w-full items-center justify-center gap-2 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-950">
                <IconBrandAppleFilled /> <div>Continue with Google</div>
            </Button>
        </div>
    </div>
)

const Tab2 = ({ form }: { form: UseFormReturn<FormType> }) => (
    <div className="flex w-full flex-col items-start justify-start gap-4 rounded-xl p-3 pb-4">
        <div>
            <h1 className="font-font text-lg">Create an account</h1>
        </div>
        <div className="w-full">
            <Label htmlFor="email" className="text-sm">
                Email
            </Label>
            <Input
                placeholder="milindpithadia@gmail.com"
                type="text"
                className="mt-1 h-10 w-full rounded-md border px-1 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-neutral-800 dark:border-neutral-800 dark:placeholder-neutral-500"
                {...form.register('email')}
            />
        </div>
        <div className="w-full">
            <Label htmlFor="password" className="text-sm">
                Password
            </Label>
            <Input
                type="password"
                placeholder="Password"
                className="mt-1 h-10 w-full rounded-md border px-1 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-neutral-800 dark:border-neutral-800 dark:placeholder-neutral-500"
                {...form.register('password')}
            />
        </div>
        <div className="mt-2.5 w-full">
            <Button type="submit" className="h-10 w-full rounded-md bg-neutral-900 font-medium text-white dark:bg-white dark:text-neutral-950">
                Submit
            </Button>
        </div>

        <div className="relative mt-6 w-full">
            <div className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-neutral-400 dark:bg-black dark:text-neutral-500">
                Or
            </div>
            <div className="border-b border-neutral-300 dark:border-neutral-800"></div>
        </div>
        <div className="mt-6 flex w-full flex-col gap-4">
            <Button type="button" className="font-regular flex h-10 w-full items-center justify-center gap-2 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-950">
                <IconBrandGoogleFilled /> <div>Continue with Google</div>
            </Button>
            <Button type="button" className="font-regular flex h-10 w-full items-center justify-center gap-2 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-950">
                <IconBrandAppleFilled /> <div>Continue with Google</div>
            </Button>
        </div>
    </div>
)
