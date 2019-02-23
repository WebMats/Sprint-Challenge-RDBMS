const faker = require('faker');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      let seedingProjectsArray = [];
      for (let i = 0; i < 50; i++) {
        seedingProjectsArray.push({
          name: faker.fake('{{company.bsNoun}}'),
          description: faker.fake('{{company.catchPhrase}}'),
          completed: JSON.parse(faker.fake('{{random.boolean}}'))
        })
      }
      return knex('projects').insert(seedingProjectsArray);
    });
};
