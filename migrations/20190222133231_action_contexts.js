
exports.up = function(knex, Promise) {
    return knex.schema.createTable('action_contexts', function (tbl) {
      tbl
          .increments()
          .notNullable();
  
          tbl
          .integer('action_id')
          .unsigned()
          .notNullable()
          .references('id').inTable('actions')
          .onDelete('CASCADE').onUpdate('CASCADE');
      tbl
          .integer('context_id')
          .unsigned()
          .notNullable()
          .references('id').inTable('contexts')
          .onDelete('CASCADE').onUpdate('CASCADE');
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists('action_contexts');
  };
  