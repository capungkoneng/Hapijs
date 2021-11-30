module.exports = require( 'knex' )( {

    client: 'pg',
    connection: {

        host: 'localhost',

        user: 'postgres',
        password: '0',

        database: 'todohapi',
        charset: 'utf8',

    }

} );