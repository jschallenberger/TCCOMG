exports.up = function(knex) {
  return knex.schema.createTable('chat', function(table){
    table.increments('id').primary();
    table.string('message').notNullable();
    

    table.string('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('usuarios');


    table.string('jogo_id').notNullable();
    table.foreign('jogo_id').references('id').inTable('jogos');

  }) 
};

exports.down = function(knex) {
  return knex.schema.dropTable('jogos');
};