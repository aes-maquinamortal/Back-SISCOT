
exports.up = function(knex, Promise) {
    Promise.all([
        knex.schema.createTable('proveedor', (table) => {
          table.integer('nit').primary().unsigned();
          table.string('nombre');
          table.string('usuario').references('usuario.usuario');
          table.string('direccion');
        })
      ])
};

exports.down = function(knex, Promise) {
  
};
