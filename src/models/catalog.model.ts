import table from '../databases/table';
import knex from '../databases/knex';
import { Catalog } from '../core/types/product.type';
import _ from 'lodash';

class CatalogModel {
    create(payload: Catalog): Promise<Catalog[]> {
        return knex(table.catalogs).returning('catalog_id').insert(payload);
    }

    update(payload: Catalog) {
        return knex(table.catalogs).where('catalog_id', payload.catalog_id).update(payload);
    }

    findAll(): Promise<Catalog[]> {
        const columns = ['Catalogs.catalog_id', 'Catalogs.catalog_name', 'Catalogs.catalog_status', 'Categories.category_id', 'Categories.category_name', 'Categories.category_status'];
        return knex.select(columns)
            .from('Catalogs')
            .innerJoin('Categories', 'Catalogs.catalog_id', 'Categories.catalog_id')
            .orderBy('Catalogs.catalog_id')
            .then(rows => {
                rows = _.chain(rows)
                    .groupBy('catalog_id')
                    .map((value, key) => {
                        return {
                            catalog_id: key,
                            catalog_name: value[0].catalog_name,
                            catalog_status: value[0].catalog_status,
                            categories: value.map((item: any) => {
                                return {
                                    category_id: item.category_id,
                                    category_name: item.category_name,
                                    category_status: item.category_status
                                };
                            }),
                        };
                    })
                    .value();           
                return rows;
            });
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

        const data = await queryBuilder;

        if (data && data.catalog_id) {
            return true;
        }

        return false;
    }
}

export default new CatalogModel();
