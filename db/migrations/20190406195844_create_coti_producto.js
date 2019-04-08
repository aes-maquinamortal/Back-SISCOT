
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('coti_producto', (table) => {
          table.increments('id').primary().unsigned();
          table.integer('cotizacionid').unsigned().references('cotizacion.id');
          table.integer('productoid').unsigned().references('producto.id');
          table.integer('cantidad');
        })
      ])
};

exports.down = function(knex, Promise) {
  
};
