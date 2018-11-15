
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('authors')
    .truncate()
    .then(() => {
      // Inserts seed entries
    return knex('authors').insert([
      { name: 'Patrick Rothfuss', age: 44 },
      { name: 'Brandon Sanderson', age: 42 },
      { name: 'Terry Pratchett', age: 66 }
    ]);
  });
};
