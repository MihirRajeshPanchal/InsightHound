"use client"
import { useAuth } from '@/hooks/use-auth'
import { GetProductComparisonBody, Products } from '@/lib/types/api';
import { TNoParams } from '@/lib/types/common';
import { fetchAPI } from '@/lib/utils/fetch-api';
import React from 'react'
import FeatureForm from './form';
import { useMutation } from '@tanstack/react-query';
import Cards from './cards';
import { toast } from 'sonner';
// import { sampleProductComparison } from '@/lib/sample';

async function fetchProductComparison(body: GetProductComparisonBody) {
    // return { data: sampleProductComparison as Products };
    return await fetchAPI<Products, TNoParams, GetProductComparisonBody>({
        url: "/product_compare",
        method: "POST",
        body,
        baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
    })
}

function useProductComparison() {
    const mutation = useMutation({
        mutationKey: ["product-comparison"],
        mutationFn: async (body: GetProductComparisonBody) => (await fetchProductComparison(body)).data
    })
    return mutation
}
export default function ProductComparison() {
    const { user } = useAuth();
    const [productName, setProductName] = React.useState<string>('');

    const mutation = useProductComparison();
    const { mutateAsync, data } = mutation

    console.log(data)

    async function onSubmit() {
        if (!user?.companyId || productName.trim().length === 0) return;
        toast.loading('Fetching product comparison data...')
        const res = await mutateAsync({ id: user?.companyId, product_name: productName })
        if (res) {
            const elem = document.getElementById('product-comparison');
            if (elem) {
                elem.scrollIntoView({ behavior: 'smooth', block: "end" });
            }
        }
        toast.success('Product comparison data fetched successfully!')
    }

    return (
        <>
            <FeatureForm value={productName} setValue={setProductName} onSubmit={onSubmit} mutation={mutation} />
            <Cards mutation={mutation} />
        </>
    )
}
