'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LuminositySchema extends Schema {
  up () {
    this.create('luminosities', (table) => {
      table.increments()
      table.timestamps()
      table.integer('lum')
    })
  }

  down () {
    this.drop('luminosities')
  }
}

module.exports = LuminositySchema
