export default {
  type: 'object',
  properties: {
    address_id: {
      type: 'string',
    },
    customer_first_name: {
      type: 'string',
    },
    customer_last_name: {
      type: 'string',
    },
    address_phone: {
      type: 'string',
    },
    address_street: {
      type: 'string',
    },
    address_zipcode: {
      type: 'string',
    },
    address_city: {
      type: 'string',
    },
    address_country: {
      type: 'string',
    },
    address_state: {
      type: 'string',
    },
    address_note: {
      type: 'string',
    },
    address_status: {
      type: 'number',
    },
  },
  required: [
    'customer_first_name',
    'customer_last_name',
    'address_phone',
    'address_street',
    'address_zipcode',
    'address_city',
    'address_country',
  ],
  additionalProperties: false,
};
