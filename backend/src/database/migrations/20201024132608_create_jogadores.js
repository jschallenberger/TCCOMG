exports.up = function(knex) {
  return knex.schema.createTable('jogadores', function(table){
    table.increments('id');
    table.string('candidatura').notNullable();

    table.string('user_id').notNullable();
    table.string('jogo_id').notNullable();

    table.foreign('user_id').references('id').inTable('usuarios');
    table.foreign('jogo_id').references('id').inTable('infojogo');

  }) 
};

exports.down = function(knex) {
  
};
