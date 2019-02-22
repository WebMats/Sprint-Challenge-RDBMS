
exports.up = function(knex, Promise) {
  return knex.schema.createTable('actions', function (tbl) {
    tbl
        .increments()
        .notNullable();

    tbl
        .string('description', 128)
        .notNullable();

    tbl
        .string('notes', 255);

    tbl
        .boolean('completed')
        .notNullable()
        .defaultTo(false);
    
    tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id').inTable('projects')
        .onDelete('CASCADE').onUpdate('CASCADE');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('actions');
};
