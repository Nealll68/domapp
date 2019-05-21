'use strict'

const Temperature = use('App/Models/Temperature')

class TempController {

    async getLast ({ response }) {
        try {
            const lastTemp = await Temperature.pickInverse()
            const lastTempJSON = lastTemp.toJSON()
            
            response.ok({
                "temperature": lastTempJSON[0].temp
            })
        } catch (ex) {
            response.internalServerError(ex.toString())
        }
    }

}

module.exports = TempController
