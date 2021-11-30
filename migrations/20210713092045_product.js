exports.up = function (knex) {
  return knex.schema
    .createTable("product", (table) => {
      table.increments().primary();
      table.string("name", 255).notNullable();
      table.string("description", 255).notNullable();
      table.string("price").notNullable();
      table.string("stock").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("category", function (table) {
      table.increments().primary();
      table.string("name", 255).notNullable();
      table.string("category", 255).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.integer("category_id").references("id").inTable("product");
    });
};

exports.down = function (knex) {};
