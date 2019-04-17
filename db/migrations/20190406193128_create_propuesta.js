
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('propuesta', (table) => {
          table.increments('id').primary().unsigned();
          table.integer('cotizacionid').unsigned().references('cotizacion.id');
          table.integer('proveedorid').unsigned().references('proveedor.nit');
          table.date('fecha');
          table.decimal('total');
          table.decimal('descuento');
          table.string('estado').defaultTo('PENDIENTE');
        })
      ])
};

exports.down = function(knex, Promise) {
  
};
