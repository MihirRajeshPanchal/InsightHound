import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Product } from "@/lib/types/api"

export default function ProductCard({ data }: { data: Product }) {

    return (
        <Card className="w-full max-w-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
                <CardTitle className="text-2xl font-bold">{data.product_name}</CardTitle>
                <CardDescription className="text-blue-100">by {data.company_name}</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Pricing</h3>
                    <p className="text-gray-600 dark:text-gray-300">{data.product_pricing}</p>
                </div>
                <Separator className="my-4" />
                <div>
                    <h3 className="text-lg font-semibold mb-2">Reviews</h3>
                    {data.product_reviews.map((review, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">{review.reviewer_name}</span>
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                                    {review.reviewer_rating}
                                </Badge>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">{review.reviewer_comment}</p>
                            {index < data.product_reviews.length - 1 && <Separator className="my-4" />}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

