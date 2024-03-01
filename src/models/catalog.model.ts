import table from '../databases/table';
import knex from '../databases/knex';
import { Catalog } from '../core/types/product.type';

class CatalogModel {
    create(payload: Catalog): Promise<Catalog[]> {
        return knex(table.catalogs).returning('catalog_id').insert(payload);
    }

    update(payload: Catalog) {
        return knex(table.catalogs).where('catalog_id', payload.catalog_id).update(payload);
    }

    findAll(): Promise<Catalog[]> {
        const columns = ['catalog_id', 'catalog_name', 'catalog_status'];
        return knex.select(columns).from(table.catalogs);
    }

    findOne(payload: Catalog) {
        const { catalog_id, catalog_name } = payload;
        const queryBuilder = knex.select('catalog_id').from(table.catalogs).first();

        if (catalog_name) {
            queryBuilder.where('catalog_name', catalog_name);
        }

        if (catalog_id) {
            queryBuilder.where('catalog_id', catalog_id);
        }

        return queryBuilder;
    }

    async exists(payload: Catalog) : Promise<boolean> {
        const { catalog_id, catalog_name } = payload;

        const queryBuilder = knex.select('catalog_id').from(table.catalogs).first();

        if(catalog_name) {
            queryBuilder.where('catalog_name', catalog_name);
        }

        if(catalog_id) {
            if(catalog_name) {
                queryBuilder.orWhere('catalog_id', catalog_id);
            } else {
                queryBuilder.where('catalog_id', catalog_id);
            }
        }

        const tax = await queryBuilder;

        if (tax && tax.catalog_id) {
            return true;
        }

        return false;
    }
}

export default new CatalogModel();
