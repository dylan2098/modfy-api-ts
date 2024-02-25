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
