import table from '../databases/table';
import knex from '../databases/knex';
import { Category } from '../core/types/product.type';

class CategoryModel {
    create(payload: Category): Promise<Category[]> {
        return knex(table.categories).returning('category_id').insert(payload);
    }

    update(payload: Category) {
        return knex(table.categories).where('category_id', payload.category_id).update(payload);
    }

    findAll(): Promise<Category[]> {
        const columns = ['category_id', 'category_name', 'category_status', 'catalog_name', 'Catalogs.catalog_id'];
        return knex.select(columns).from(table.categories).innerJoin(table.catalogs, 'Categories.catalog_id', '=', 'Catalogs.catalog_id');
    }

    findOne(payload: Category) {
        const { category_id, category_name } = payload;
        const queryBuilder = knex.select('category_id').from(table.categories).first();

        if (category_name) {
            queryBuilder.where('category_name', category_name);
        }

        if (category_id) {
            queryBuilder.where('category_id', category_id);
        }

        return queryBuilder;
    }

    async exists(payload: Category) : Promise<boolean> {
        const { category_id, category_name } = payload;

        const queryBuilder = knex.select('category_id').from(table.categories).first();

        if(category_name) {
            queryBuilder.where('category_name', category_name);
        }

        if(category_id) {
            if(category_name) {
                queryBuilder.orWhere('category_id', category_id);
            } else {
                queryBuilder.where('category_id', category_id);
            }
        }

        const result = await queryBuilder;

        if (result && result.category_id) {
            return true;
        }

        return false;
    }
}

export default new CategoryModel();
