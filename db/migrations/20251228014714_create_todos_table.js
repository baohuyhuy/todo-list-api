/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('todos', (table) => {
    table.increments('id');
    table.text('title').notNullable();
    table.text('description').notNullable();
    table.boolean('completed').defaultTo(false);
    table
      .integer('user_id')
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('todos');
}
