module.exports = {

    development: {
        client: 'mysql',
        connection:{
            host: "localhost",
            user: "root",
            password: "admin",
            database: "siscot"
        }
    },

    production: {
        // connection to aws
    }
}