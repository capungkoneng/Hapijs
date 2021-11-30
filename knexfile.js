// Update with your config settings.

module.exports = {

  development: {

      migrations: { tableName: 'knex_migrations' },
      seeds: { tableName: './seeds' },

      client: 'pg',
      connection: {

          host: 'localhost',

          user: 'postgres',
          password: '0',

          database: 'todohapi',
          charset: 'utf8',

      }

  }

};
