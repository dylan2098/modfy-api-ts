export type BasketItem = {
    product_id: string;
    quantity: number;
}

export type Basket = {
    basket_id?: string;
    billing_id?: string;
    shipping_id?: string;
    payment_method_id?: string;
    basket?: BasketItem[];
    basket_items?: string;
    basket_updated_at?: Date;
}