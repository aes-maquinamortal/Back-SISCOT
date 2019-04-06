
exports.up = function(knex, Promise) {
    Promise.all([
        knex.schema.createTable('producto', (table) => {
          table.increments('id').primary().unsigned();
          table.string('nombre');
          table.double('precio');
          table.integer('stock');
          table.string('referencia').unique();
        })
      ])
};

exports.down = function(knex, Promise) {
  
};
