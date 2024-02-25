export const ProductSchema = {
  type: 'object',
  properties: {
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
  },
  required: ['category_id', 'inventory_id', 'product_sku', 'product_name'],
  additionalProperties: false,
};

export const ProductAttributeSchema = {
  type: 'object',
  properties: {
    product_id: {
      type: 'string',
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
    }
  },
  required: ['product_id', 'attribute_image', 'attribute_type'],
  additionalProperties: false,
};