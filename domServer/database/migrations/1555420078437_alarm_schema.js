'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlarmSchema extends Schema {
	up () {
		this.create('alarms', (table) => {
			table.increments()
			table.timestamps()
			table.boolean('alarmState').notNullable()
		})
	}

	down () {
		this.drop('alarms')
	}
}

module.exports = AlarmSchema
