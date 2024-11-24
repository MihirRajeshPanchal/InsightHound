"use client"

import { useAuth } from "@/hooks/use-auth"
import { CompetitorMappingApiResponse } from "@/lib/types/api";
import { fetchAPI } from "@/lib/utils/fetch-api";
import { useQuery } from "@tanstack/react-query";

export default function CompetitorMapping() {
    const { user } = useAuth();
    const { data } = useQuery({
        queryKey: ['competitor-mapping', user?.id],
        queryFn: async () => {
            const response = await fetchAPI<CompetitorMappingApiResponse>({
                url: `/rivals/${user?.id}`,
                method: 'GET',
                baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
            });
            return response;
        },
        enabled: !!user,
    })

    const { data: userData } = useQuery({
        queryKey: ['self', user?.id],
        queryFn: async () => {
            const response = await fetchAPI({
                url: `/self/${user?.id}`,
                method: 'GET',
                baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
            });
            return response;
        },
        enabled: !!user,
    })

    console.log({ data, user, userData });
    return (
        <div>
            hii
        </div>
    )
}
