'use client';
import { Product } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useProducts: () => { products: Product[]; isLoading: boolean; error: string | null } = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        const fetchProducts = async () => {
            try {
                const fetchData = await axios.get("/products", {
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                    },
                    baseURL: API_URL,
                });
                setProducts(fetchData.data);
            } catch (error) {
                setError(error as string);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProducts();
    }, []);


    return { products, isLoading, error };
}

export default useProducts;
