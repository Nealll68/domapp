'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TemperatureSchema extends Schema {
  up () {
    this.create('temperatures', (table) => {
      table.increments()      
      table.timestamps()
      table.integer('temp')
    })
  }

  down () {
    this.drop('temperatures')
  }
}

module.exports = TemperatureSchema
