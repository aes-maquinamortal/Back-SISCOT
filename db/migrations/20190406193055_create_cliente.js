
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('cliente', (table) => {
          table.integer('identificacion').primary().unsigned();
          table.string('tipo_identificacion');
          table.string('nombre');
          table.string('usuario').references('usuario.usuario');
          table.string('direccion');
        })
      ])
};

exports.down = function(knex, Promise) {
  
};