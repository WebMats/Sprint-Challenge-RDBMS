
exports.up = function(knex, Promise) {
    return knex.schema.createTable('contexts', function (tbl) {
      tbl
          .increments()
          .notNullable();
  
      tbl
          .string('context', 128)
          .notNullable();
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists('contexts');
  };
  