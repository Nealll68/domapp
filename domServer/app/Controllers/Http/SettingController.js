'use strict'

const Setting = use('App/Models/Setting')

const LightService = use('App/Services/LightService')
const HeaterService = use('App/Services/HeaterService')
const AlarmService = use('App/Services/AlarmService')

class SettingController {
    async get ({ response }) {
        try {
            const allSettings = await Setting.find(1)

            response.ok({
                "lightAutoMode": allSettings.lightAutoMode,
                "lightThreshold": allSettings.lightThreshold,
                "heaterState": allSettings.heaterState,
                "heaterThreshold": allSettings.heaterThreshold,
                "alarmState": allSettings.alarmState
            })
        } catch (ex) {
            response.internalServerError(ex.toString())
        }
    }

    async set ({ request, response }) {        
        let data = request.only(['field', 'value', 'android'])       

        try {
            if (data.android) {
                let dataSplit = data.android.split(';')
                data.field = dataSplit[0]
                data.value = dataSplit[1]
            }

           if (data.field === 'lightAutoMode') {
                await LightService.switchMode(data.value)
            } else if (data.field === 'lightThreshold') {
                await LightService.setThreshold(data.value)
            } else if (data.field === 'heaterState') {
                await HeaterService.switchState(data.value)
            } else if (data.field === 'heaterThreshold') {
                await HeaterService.setThreshold(data.value)
            } else if (data.field === 'alarmState') {
                await AlarmService.switchState(data.value)
            }

            response.ok()
        } catch (ex) {
            response.internalServerError(ex.toString())
        }
    }
}

module.exports = SettingController
