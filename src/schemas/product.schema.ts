const properties = {
  category_id: {
    type: 'string',
  },
  inventory_id: {
    type: 'string',
  },
  product_sku: {
    type: 'string',
  },
  product_name: {
    type: 'string',
  },
  sets_id: {
    type: 'array',
  },
  variants: {
    type: 'array',
  },
  attribute_brand: {
    type: 'string',
  },
  attribute_color: {
    type: 'string',
  },
  attribute_size: {
    type: 'string',
  },
  attribute_model: {
    type: 'string',
  },
  attribute_type: {
    type: 'string',
  },
  attribute_image: {
    type: 'string',
  },
  attribute_images: {
    type: 'string',
  },
  attribute_short_description: {
    type: 'string',
  },
  attribute_long_description: {
    type: 'string',
  },
  inventory_stock: {
    type: 'number',
  },
  inventory_mode: {
    type: 'number',
  },
  product_inventory_status : {
    type: 'number',
  },
  gross_price : {
    type: 'number',
  },
  net_price : {
    type: 'number',
  },
  sale_price : {
    type: 'number',
  },
  tax_id : {
    type: 'string',
  },
}

const dataRequired = ['product_sku', 'product_name', 'inventory_id', 'category_id'];

export const ProductSchema = {
  type: 'object',
  properties: properties,
  required: dataRequired,
  additionalProperties: false,
};