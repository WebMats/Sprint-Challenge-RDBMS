
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contexts').del()
    .then(function () {
      return knex('contexts').insert([
        { context: 'at home'},
        { context: 'at work'},
        { context: 'at computer'}
      ]);
    });
};
