export type BasketItem = {
    product_id: string;
    quantity: number;
}

export type Basket = {
    basket_id?: string;
    billing_id?: string;
    basket?: BasketItem[];
    basket_value?: string;
    basket_updated_at?: Date;
}