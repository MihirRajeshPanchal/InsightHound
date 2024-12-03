"use dom"
import "~/global.css"
import Skeleton from "./ui/skeleton"
export default function Loading() {
    return (
        <Skeleton
            className="h-full p-6 rounded-2xl shadow-lg min-w-[20px] w-full mx-6 bg-zinc-900 "
        >
            <Skeleton className="text-2xl font-bold mb-2 w-2/3 h-6 bg-zinc-700" />
            <Skeleton className="text-sm mb-4 w-4/5 h-[30px] bg-zinc-600" />

            {[1, 1, 1, 1].map((_, idx) => (
                <Skeleton key={idx} className="mb-2 bg-zinc-700 flex flex-col p-2 gap-1 w-10/12">
                    <Skeleton className=" bg-zinc-900 w-3/4 h-6" />
                    <Skeleton className=" bg-zinc-900 w-3/4 h-[20px]" />
                </Skeleton>))}

        </Skeleton>
    )
}