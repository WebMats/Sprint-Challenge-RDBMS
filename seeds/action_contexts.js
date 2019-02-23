
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('action_contexts').del()
    .then(function () {
      const actionContextsArray=[];
      for (let i = 1; i < 150; i++) {
        if (i % 2 === 0) {
          actionContextsArray.push(
            { action_id: i, context_id: 1},
            { action_id: i, context_id: 2}
            )
        } else if (i % 3 === 0) {
          actionContextsArray.push(
            { action_id: i, context_id: 1},
            { action_id: i, context_id: 2},
            { action_id: i, context_id: 3}
            )
        } else {
          actionContextsArray.push({
            action_id: i,
            context_id: 1
          })
        }
      }
      return knex('action_contexts').insert(actionContextsArray);
    });
};
