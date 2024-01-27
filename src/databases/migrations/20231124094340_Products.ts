export async function up(knex) {
    return knex.schema
    .createTable('Catalogs', (table) => {
        table.increments('catalogId').primary().unique();
        table.string('name', 100).notNullable();
        table.smallint('status').defaultTo(0);
        table.datetime('updatedAt', { precision: 6 }).defaultTo(knex.fn.now(6))
    })

    .createTable('Categories', (table) => {
        table.increments('categoryId').primary().unique();
        table.integer('catalogId').references('catalogId').inTable('Catalogs');
        table.string('name', 100).notNullable();
        table.smallint('status').defaultTo(0);
        table.datetime('updatedAt', { precision: 6 }).defaultTo(knex.fn.now(6))
    })

    .createTable('Tax', (table) => {
        table.increments('taxId').primary().unique();
        table.string('taxName');
        table.integer('taxValue');
        table.smallint('status').defaultTo(0);
    })

    .createTable('Products', (table) => {
        table.increments('productId').primary().unique();
        table.integer('categoryId').references('categoryId').inTable('Categories');
        table.string('SKU', 20);
        table.string('name');
        table.boolean('usePromotion').defaultTo(true);
        table.integer('taxId').references('taxId').inTable('Tax');
        table.smallint('status').defaultTo(0);
        table.datetime('updatedAt', { precision: 6 }).defaultTo(knex.fn.now(6))
    })

    .createTable('ProductAttributes', (table) => {
        table.increments('productId').references('productId').inTable('Products');
        table.string('brand', 50);
        table.string('color', 50);
        table.string('size', 50);
        table.string('model', 50);
        table.string('type', 10).defaultTo("normal");
        table.string('image');
        table.string('images', 50);
        table.string('shortDesc');
        table.string('longDesc');
    })

    .createTable('ProductInventories', (table) => {
        table.increments('productId').references('productId').inTable('Products');
        table.integer('stock').defaultTo(0);
        table.integer('preOrder').defaultTo(0);
        table.string('expectedDate', 20);
        table.smallint('status').defaultTo(0);
    })

    .createTable('ProductPrices', (table) => {
        table.increments('productId').references('productId').inTable('Products');
        table.float('grossPrice');
        table.float('netPrice');
        table.integer('taxId').references('taxId').inTable('Tax');
    })

    .createTable('ProductSets', (table) => {
        table.increments('id').primary().unique();
        table.integer('masterId').references('productId').inTable('Products');
        table.integer('productSetId');
    })

    .createTable('Variants', (table) => {
        table.increments('id').primary().unique();
        table.integer('masterId').references('productId').inTable('Products');
        table.integer('variantId');
    })
}

    
export async function down(knex) {
    return knex.schema
    .dropTable('ProductAttributes')
    .dropTable('ProductPrices')
    .dropTable('ProductInventories')
    .dropTable('ProductSets')
    .dropTable('Variants')
    .dropTable('Products')
    .dropTable('Categories')
    .dropTable('Catalogs')
    .dropTable('Tax')
    ;
}