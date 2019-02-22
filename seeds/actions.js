const faker = require('faker');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').del()
    .then(function () {
      let seedingActionsArray = [];
      for (let i=1; i < 175; i++) {
        seedingActionsArray.push({
          description: faker.fake('{{hacker.adjective}}'),
          notes: faker.fake('{{random.words}}'),
          completed: JSON.parse(faker.fake('{{random.boolean}}')),
          project_id: Math.floor(Math.random() * 50 + 1)
        })
      }
      return knex('actions').insert(seedingActionsArray);
    });
};
