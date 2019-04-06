const { Model } = require('objection');
const knexConfig = require('./knexfile');
const knex = require('knex');

Model.knex(knex(knexConfig.development));