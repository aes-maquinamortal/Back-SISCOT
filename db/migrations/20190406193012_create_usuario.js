
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('usuario', (table) => {
          table.string('usuario').primary();
          table.string('password');
          table.string('correo');
          table.string('tipo');
        })
      ])
};

exports.down = function(knex, Promise) {
  
};
