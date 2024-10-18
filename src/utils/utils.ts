import { Product } from "@/types/types"
import { debounce } from "@mui/material"
import axios from "axios"
import { useCallback } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const mapSearchInputOptions = (products: Product[]) => {
    const options = products.map((p) => {
        return {
            id: p.id,
            label: p.product
        }
    })
    return options
}
