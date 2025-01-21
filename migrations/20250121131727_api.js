exports.up = async function (knex) {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
    });

    await knex.schema.createTable('products', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description');
        table.decimal('price', 10, 2).notNullable();
        table.integer('quantity').defaultTo(0);
        table.string('imageUrl');
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('products');
    await knex.schema.dropTableIfExists('users');
};
