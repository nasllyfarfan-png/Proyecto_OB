export interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image?: string;
    stock: number;
    sku?: string;
    isActive: boolean;
    discount?: number;
    createdAt?: string;
    updatedAt?: string;
}