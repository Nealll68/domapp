'use strict'

const Luminosity = use('App/Models/Luminosity')

class LumController {
    async getLast ({ response }) {
        try {
            const lastLum = await Luminosity.pickInverse()
            const lastLumJSON = lastLum.toJSON()

            response.ok({
                "luminosity": lastLumJSON[0].lum
            })
        } catch (ex) {
            response.internalServerError(ex.toString())
        }
    }
}

module.exports = LumController
