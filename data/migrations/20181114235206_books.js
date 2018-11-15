
exports.up = function(knex, Promise) {
    return knex.schema.createTable('books', tbl => {
        tbl.increments();
        tbl.string('name', 256);
        tbl.string('genre', 256);
        tbl.integer('author_id')
            .unsigned()
            .references('id')
            .inTable('authors');
        tbl.timestamps(true, true);
    })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('books');
};
