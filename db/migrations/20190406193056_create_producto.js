
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('producto', (table) => {
          table.increments('id').primary().unsigned();
          table.string('nombre');
          table.string('referencia').unique();
          table.text('url')
        })
      ])
};

exports.down = function(knex, Promise) {
  
};
