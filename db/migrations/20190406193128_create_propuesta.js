
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('propuesta', (table) => {
          table.increments('id').primary().unsigned();
          table.integer('clienteid').unsigned().references('cliente.identificacion');
          table.integer('proveedorid').unsigned().references('proveedor.nit');
          table.date('fecha');
          table.decimal('total');
          table.decimal('descuento');
        })
      ])
};

exports.down = function(knex, Promise) {
  
};
