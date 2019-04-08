
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('prov_producto', (table) => {
          table.increments('id').primary().unsigned();
          table.integer('proveedorid').unsigned().references('proveedor.nit');
          table.integer('productoid').unsigned().references('producto.id');
        })
      ])
};

exports.down = function(knex, Promise) {
  
};
