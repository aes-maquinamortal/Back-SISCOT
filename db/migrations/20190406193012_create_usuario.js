
exports.up = function(knex, Promise) {
    Promise.all([
        knex.schema.createTable('usuario', (table) => {
          table.string('usuario').primary();
          table.string('nombre');
          table.string('password');
          table.string('correo');
          table.string('tipo');
        })
      ])
};

exports.down = function(knex, Promise) {
  
};
