'use strict'

const Light = use('App/Models/Light')
const LightService = use('App/Services/LightService')

class LightController {
    async getLastAllLightState ({ response }) {
        try {
            const inLightState = await Light.query().where('lightPosition', 'inside').orderBy('id', 'desc').limit(1).fetch()
            const outLightState = await Light.query().where('lightPosition', 'outside').orderBy('id', 'desc').limit(1).fetch()
            const inLightStateJSON = inLightState.toJSON()
            const outLightStateJSON = outLightState.toJSON()

            response.ok({
                "inLightState": inLightStateJSON[0].state,
                "outLightState": outLightStateJSON[0].state
            })
        } catch (ex) {
            response.internalServerError(ex.toString())
        }
    }

    async setLightState ({ request, response }) {
        const data = request.only(['position', 'state'])

        try {
            LightService.setState(data.position, data.state)

            response.ok()
        } catch (ex) {
            response.internalServerError(ex.toString())
        }
    }
}

module.exports = LightController
