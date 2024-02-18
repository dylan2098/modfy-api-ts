import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("Menus").del();

    const data = [
        {
            menu_name: "Home",
            menu_path: '/',
            menu_status: 1
        },
        {
            menu_name: "Apple",
            menu_path: '/apple',
            menu_status: 1
        },
        {
            menu_name: "Samsung",
            menu_path: '/samsung',
            menu_status: 1
        },
        {
            menu_name: "LG",
            menu_path: '/lg',
            menu_status: 1
        },
        {
            menu_name: "Microsoft",
            menu_path: '/microsoft',
            menu_status: 1
        },
        {
            menu_name: "Accessories",
            menu_path: '/accessories',
            menu_status: 1
        },
        {
            menu_name: "Decor",
            menu_path: '/decor',
            menu_status: 1
        }
    ]
    // Inserts seed entries
    await knex("Menus").insert(data);
};
