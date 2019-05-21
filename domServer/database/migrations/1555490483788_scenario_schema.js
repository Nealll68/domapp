'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScenarioSchema extends Schema {
	up () {
		this.create('scenarios', (table) => {
			table.increments()
			table.timestamps()
			table.string('name')
			table.string('action')
			table.timestamp('execution_at').nullable().defaultTo(null)
			table.boolean('isRecurrent')
			table.string('day').nullable().defaultTo(null)
			table.string('time').nullable().defaultTo(null)
		})
	}

	down () {
		this.drop('scenarios')
	}
}

module.exports = ScenarioSchema
