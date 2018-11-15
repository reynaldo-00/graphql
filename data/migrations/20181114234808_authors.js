
exports.up = function(knex, Promise) {
    return knex.schema.createTable('authors', tbl => {
        tbl.increments();
        tbl.string('name', 256);
        tbl.integer('age');
        tbl.timestamps(true, true);
    })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('authors');
};
