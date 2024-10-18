'use client';
import PriceInput from '@/components/atoms/price_input';
import SearchInput from '@/components/atoms/search_input';
import Title from '@/components/atoms/title';
import { Button } from '@mui/material';
import useProducts from '@/hooks/useProducts';
import { useForm, Controller, FieldValues } from "react-hook-form";
import { Product } from '@/types/types';
import { useEffect, useState } from 'react';

const SearchForm = () => {
    const [price, setPrice] = useState<number | undefined>();
    const { products, isLoading } = useProducts();
    const { handleSubmit, watch, setValue, control, formState: { errors } } = useForm();
    const onSubmit = (data: FieldValues) => {
        if (!errors?.price && !errors?.product) {
            console.log({ ...data.product, price: data.price });
        }
    }

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
            {isLoading ? <p>Loading...</p> : (
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
                                onChange={(e, data) => {
                                    field.onChange(data)
                                    const selectedProduct = products.find((p: Product) => p.id === data.id)
                                    setPrice(selectedProduct?.price);
                                }}
                                value={field.value}
                            />
                        )}
                    />
                    {errors.product && <p className='text-red-500'>This field is required</p>}
                    <Controller
                        name="price"
                        control={control}
                        defaultValue={price}
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
                </form>)
            }
        </>
    )
}

export default SearchForm