'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SettingSchema extends Schema {
	up () {
		this.create('settings', (table) => {
			table.increments()
			table.timestamps()
			table.boolean('lightAutoMode').notNullable()			
			table.integer('lightThreshold').notNullable()
			table.boolean('heaterState').notNullable()
			table.integer('heaterThreshold').notNullable()
			table.boolean('alarmState').notNullable()
		})
	}

	down () {
		this.drop('settings')
	}
}

module.exports = SettingSchema
