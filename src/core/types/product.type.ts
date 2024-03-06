export type Tax = {
  tax_id?: string;
  tax_name?: string;
  tax_value?: string;
  tax_status?: number;
};

export type Catalog = {
  catalog_id?: string;
  catalog_name?: string;
  catalog_status?: number;
  catalog_updated_at?: string;
};

export type Category = {
  category_id?: string;
  catalog_id?: string;
  category_name?: string;
  category_status?: number;
  category_updated_at?: string;
};


export type Product = {
  product_id?: string;
  category_id?: string;
  inventory_id?: string;
  product_sku?: string;
  product_name?: string;
  product_status?: number;
  sets_id?: string[];
  variants?: string[];
  attribute_brand?: string;
  attribute_color?: string;
  attribute_size?: string;
  attribute_model?: string;
  attribute_type?: string;
  attribute_image?: string;
  attribute_images?: string;
  attribute_short_description?: string;
  attribute_long_description?: string;
}

export type Inventory = {
  inventory_id?: string;
  inventory_name?: string;
  inventory_status?: number;
}