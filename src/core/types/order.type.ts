export type Billing = {
    billing_id?: string;
    order_id?: string;
    customer_id?: string;
    customer_email?: string;
    customer_first_name?: string;
    customer_last_name?: string;
    customer_phone?: string;
    customer_shipping_address?: string;
    billing_type?: string;
    billing_status?: number;
    customer_note?: string;
}

export type PaymentMethod = {
    payment_method_id?: string;
    payment_method_name?: string;
    payment_method_status?: number;
}

export type Order = {
    order_id?: string;
    order_total_gross_price?: number;
    order_total_net_price?: number;
    order_total_tax_price?: number;
    order_expected_date?: string;
    order_cancel_reason?: string;
    order_status?: number;
    order_created_at?: Date;
    order_updated_at?: Date;
}

export type PaymentTransaction = {
    payment_transaction_id?: string;
    order_transaction_id?: string;
    order_id?: string;
    payment_method_id?: string;
    payment_status?: number;
}

export type OrderItem = {
    order_item_id?: string;
    order_id?: string;
    product_id?: string;
    product_quantity?: number;
    product_net_price?: number;
    product_gross_price?: number;
    product_tax_price?: number;
}

export type Shipping = {
    shipping_id?: string;
    order_id?: string;
    shipping_method?: string;
    shipping_carrier?: string;
    shipping_tracking_number?: string;
    shipping_date?: Date;
    shipping_status?: number;
}