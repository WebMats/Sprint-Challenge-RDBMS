
exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', function (tbl) {
    tbl
        .increments()
        .notNullable();
    tbl
        .string('name', 128)
        .notNullable();
    tbl
        .string('description', 255)
        .notNullable();
    tbl
        .boolean('completed')
        .notNullable()
        .defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('projects');
};
