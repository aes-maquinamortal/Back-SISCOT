
exports.up = function(knex, Promise) {
    Promise.all([
        knex.schema.createTable('cotizacion', (table) => {
          table.increments('id').primary().unsigned();
          table.integer('identificacion').references('cliente.identificacion').unsigned();
          table.date('fecha');
          table.date('fecha_fin');
        })
      ])
};

exports.down = function(knex, Promise) {
  
};
