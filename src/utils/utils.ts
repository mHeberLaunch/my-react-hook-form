import { Product } from "@/types/types"

export const mapSearchInputOptions = (products: Product[]) => {
    const options = products.map((p) => {
        return {
            id: p.id,
            label: p.product
        }
    })
    return options
}
