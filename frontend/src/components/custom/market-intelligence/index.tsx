"use client"
import { useAuth } from '@/hooks/use-auth';
import { CompanyData } from '@/lib/types/api';
import { fetchAPI } from '@/lib/utils/fetch-api';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { CompanyCard } from './company-card';

export default function MarketIntelligence() {
    const { user } = useAuth();
    const { data } = useQuery({
        queryKey: ['self-company', user?.id],
        queryFn: async () => {
            const response = await fetchAPI<CompanyData>({
                url: `/self/${user?.id}`,
                method: 'GET',
                baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
            });
            return response.data;
        },
        enabled: !!user,
    })
    return (
        <div className='flex flex-col gap-6 p-6'>
            <h2 className='font-bold text-2xl'>Market Intelligence</h2>
            {data && <CompanyCard company={data} />}
        </div>
    )
}
