'use strict'

const Scenario = use('App/Models/Scenario')

class ScenarioController {

    async create ({ request, response }) {
        const data = request.all()

        try {
            const scenario = new Scenario()

            scenario.name = data.name
            scenario.action = data.action
            scenario.isRecurrent = data.isRecurrent

            if (data.isRecurrent) {
                scenario.day = data.day
                scenario.time = data.time
            } else {
                scenario.execution_at = `${data.date} ${data.time}`
            }

            await scenario.save()
            response.ok()
        } catch (ex) {
            response.internalServerError(ex.toString())
        }
    }

    async delete ({ request, response }) {
        const { id } = request.all()

        try {
            const scenario = await Scenario.find(id)
            await scenario.delete()

            response.ok()
        } catch (ex) {
            response.internalServerError(ex.toString())
        } 
    }

    async getAll ({ response }) {
        try {
            const allScenarios = await Scenario.all()
            response.ok(allScenarios.toJSON())
        } catch (ex) {
            response.internalServerError(ex.toString())
        } 
    }

}

module.exports = ScenarioController
