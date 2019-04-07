
exports.up = function(knex, Promise) {
    Promise.all([
        knex.schema.createTable('prop_producto', (table) => {
          table.increments('id').primary().unsigned();
          table.integer('propuestaid').unsigned().references('propuesta.id');
          table.integer('productoid').unsigned().references('producto.id');
          table.integer('cantidad');
          table.integer('valor_unitario');
        })
      ])
};

exports.down = function(knex, Promise) {
  
};
