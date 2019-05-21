'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HumiditySchema extends Schema {
  up () {
    this.create('humidities', (table) => {
      table.increments()
      table.timestamps()
      table.integer('humidity')
    })
  }

  down () {
    this.drop('humidities')
  }
}

module.exports = HumiditySchema
