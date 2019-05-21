'use strict'

const Humidity = use('App/Models/Humidity')

class HumController {

    async getLast ({ response }) {
        try {
            const lastHum = await Humidity.pickInverse()
            const lastHumJSON = lastHum.toJSON()

            response.ok({
                "humidity": lastHumJSON[0].humidity
            })
        } catch (ex) {
            response.internalServerError(ex.toString())
        }
    }

}

module.exports = HumController
