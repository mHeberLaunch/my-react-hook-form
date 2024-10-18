'use client';
import PriceInput from '@/components/atoms/price_input';
import SearchInput from '@/components/atoms/search_input';
import Title from '@/components/atoms/title';
import { Button, debounce } from '@mui/material';
import { useForm, Controller, FieldValues } from "react-hook-form";
import { Product } from '@/types/types';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const SearchForm = () => {
    const [price, setPrice] = useState<number | undefined>();
    const [products, setProducts] = useState<Product[]>([]);
    const { handleSubmit, watch, setValue, control, formState: { errors } } = useForm();

    const onSubmit = (data: FieldValues) => {
        if (!errors?.price && !errors?.product) {
            console.log({ ...data.product, price: data.price });
        }
    }

    const searchProducts = useCallback(debounce(async (value: string) => {
        if (value.length < 1) {
            return;
        }
        try {
            const response = await axios.get<Product[]>(`${API_URL}/products?product_like=${value}`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, 300), []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'product') {
                const selectedProduct = products.find((p: Product) => p.id === value.product.id);
                setPrice(selectedProduct?.price);
                setValue('price', selectedProduct?.price);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, products, setValue]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Title text="My React Hook Form" />
                <Controller
                    name="product"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                        <SearchInput
                            label='Search product by name'
                            options={products}
                            className='pt-8'
                            onKeyDown={(e) => searchProducts(e.target.value)}
                            onChange={(e, data) => {
                                if (products.length > 0 && data !== null) {
                                    field.onChange(data);
                                    const selectedProduct = products.find((p) => p.id === data.id);
                                    setPrice(selectedProduct?.price);
                                }
                            }}
                            value={field.value}
                        />
                    )}
                />
                {errors.product && <p className='text-red-500'>This field is required</p>}
                <Controller
                    name="price"
                    control={control}
                    defaultValue={price || ''}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <PriceInput
                            label='Price'
                            className='pt-8'
                            value={price}
                            onChange={(e) => field.onChange(e.target.value)}
                        />
                    )}
                />
                {errors.price && <p className='text-red-500'>This field is required</p>}
                <Button
                    variant="contained"
                    className='!mt-8 w-1/2'
                    type='submit'
                >
                    Submit
                </Button>
            </form>
        </>
    )
}

export default SearchForm