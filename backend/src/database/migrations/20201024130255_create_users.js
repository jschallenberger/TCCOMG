exports.up = function(knex) {
  return knex.schema.createTable('usuarios', function(table){
     table.string('id').primary();
     table.string('name').notNullable();
     table.string('email').notNullable();
     table.string('genero').notNullable();
     table.integer('idade').notNullable();
 
   })
 };
 
 exports.down = function(knex) {
   return knex.schema.dropTable('usuarios');
 };
