exports.up = function(knex) {
  return knex.schema.createTable('infojogo', function(table){
    table.increments('id').primary();
    table.string('esporte').notNullable();
    table.string('modalidade').notNullable();
    table.integer('idademin').notNullable();
    table.integer('idademax').notNullable();
    table.string('cidade').notNullable();
    table.string('uf', 2).notNullable();
    table.string('endereco').notNullable();
    table.string('horario').notNullable();
    table.string('descricao').notNullable();
    table.string('date').notNullable();


    table.string('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('usuarios');

  }) 
};

exports.down = function(knex) {
  return knex.schema.dropTable('infojogo');
};
