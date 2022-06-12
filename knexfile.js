// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const env = require('./Model/env')



module.exports = {

  client: 'mysql2',
  connection: {
    host: env.heroku.host,
    port: 3306,
    user: env.heroku.user,
    password: env.heroku.password,
    database: env.heroku.database

  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: __dirname + '/Model/migrations',
    tableName: 'knex_migrations'
  }
}

