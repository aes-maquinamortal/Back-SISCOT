const { Model } = require('objection');
const knexConfig = require('./knexfile');
const knex = require('knex');

const knexInstance = knex(knexConfig.development);

// knexInstance.on('query', data => console.log(data));

Model.knex(knexInstance);