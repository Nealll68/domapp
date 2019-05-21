'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LightSchema extends Schema {
  up () {
    this.create('lights', (table) => {
      table.increments()
      table.timestamps()
      table.string('lightPosition', 254)
      table.boolean('state').notNullable()
    })
  }

  down () {
    this.drop('lights')
  }
}

module.exports = LightSchema
