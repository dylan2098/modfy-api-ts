import table from '../databases/table';
import knex from '../databases/knex';
import { Tax } from '../core/types/product.type';

class TaxModel {
    create(payload: Tax): Promise<Tax[]> {
        return knex(table.taxes).returning('tax_id').insert(payload);
    }

    update(payload: Tax) {
        return knex(table.taxes).where('tax_id', payload.tax_id).update(payload);
    }

    findAll(): Promise<Tax[]> {
        const columns = ['tax_id', 'tax_name', 'tax_value', 'tax_status'];
        return knex.select(columns).from(table.taxes);
    }

    findOne(payload: Tax) {
        const { tax_id, tax_name } = payload;
        const queryBuilder = knex.select('tax_id').from(table.taxes).first();

        if (tax_name) {
            queryBuilder.where('tax_name', tax_name);
        }

        if (tax_id) {
            queryBuilder.where('tax_id', tax_id);
        }

        return queryBuilder;
    }

    async exists(payload: Tax) : Promise<boolean> {
        const { tax_id, tax_name } = payload;

        const queryBuilder = knex.select('tax_id').from(table.taxes).first();

        if(tax_name) {
            queryBuilder.where('tax_name', tax_name);
        }

        if(tax_id) {
            if(tax_name) {
                queryBuilder.orWhere('tax_id', tax_id);
            } else {
                queryBuilder.where('tax_id', tax_id);
            }
        }

        const tax = await queryBuilder;

        if (tax && tax.tax_id) {
            return true;
        }

        return false;
    }
}

export default new TaxModel();
