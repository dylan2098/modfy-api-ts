import table from '../databases/table';
import knex from '../databases/knex';
import { Inventory } from '../core/types/product.type';

class InventoryModel {
    create(payload: Inventory): Promise<Inventory[]> {
        return knex(table.inventories).returning('inventory_id').insert(payload);
    }

    update(payload: Inventory) {
        return knex(table.inventories).where('inventory_id', payload.inventory_id).update(payload);
    }

    findAll(): Promise<Inventory[]> {
        const columns = ['inventory_id', 'inventory_name', 'inventory_status'];
        return knex.select(columns).from(table.inventories);
    }

    findOne(payload: Inventory) {
        const { inventory_id, inventory_name } = payload;
        const queryBuilder = knex.select('inventory_id').from(table.inventories).first();

        if (inventory_name) {
            queryBuilder.where('inventory_name', inventory_name);
        }

        if (inventory_id) {
            queryBuilder.where('inventory_id', inventory_id);
        }

        return queryBuilder;
    }

    async exists(payload: Inventory) : Promise<boolean> {
        const { inventory_id, inventory_name } = payload;

        const queryBuilder = knex.select('inventory_id').from(table.inventories).first();

        if(inventory_name) {
            queryBuilder.where('inventory_name', inventory_name);
        }

        if(inventory_id) {
            if(inventory_name) {
                queryBuilder.orWhere('inventory_id', inventory_id);
            } else {
                queryBuilder.where('inventory_id', inventory_id);
            }
        }

        const data = await queryBuilder;

        if (data && data.inventory_id) {
            return true;
        }

        return false;
    }
}

export default new InventoryModel();
