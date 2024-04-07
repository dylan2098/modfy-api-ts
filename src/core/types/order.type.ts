export type Order = {
    order_id?: string;
    order_transaction_id?: string;
    order_total_gross_price?: number;
    order_total_net_price?: number;
    order_total_tax_price?: number;
    order_expected_date?: string;
    order_cancel_reason?: string;
    order_items?: string;
    order_status?: number;
    order_created_at?: Date;
    order_updated_at?: Date;
}

export type PaymentTransaction = {
    payment_transaction_id?: string;
    order_id?: string;
    payment_method_id?: string;
    payment_status?: number;
}