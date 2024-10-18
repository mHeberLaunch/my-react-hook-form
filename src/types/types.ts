export type Product = {
    id: number;
    product: string;
    price: number;
}

export type TPriceInput = {
    label: string,
    value: number | undefined,
    className?: string;
    disabled?: boolean;
    onChange: (e: any) => void;
}

export type TSearchInput = {
    label: string,
    options: Product[],
    className?: string;
    onChange: (e: any, data: any) => void;
    value: any;
}
