export type Basket = {
    basket_id?: string;
    billing_id?: string;
    basket_total_items?: number;
    basket_total_gross_price?: number;
    basket_total_net_price?: number;
    basket_total_tax_price?: number;
    basket_status?: number;
    basket_updated_at?: Date;
}

export type BasketItem = {
    basket_item_id?: string;
    basket_id?: string;
    product_id?: string;
    product_quantity?: number;
    product_net_price?: number;
    product_gross_price?: number;
    product_tax_price?: number;
}