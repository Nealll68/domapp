'use strict'

const Setting = use('App/Models/Setting')
const TcpServer = use('App/Services/TcpServer')

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
        const data = request.only(['field', 'value'])

        try {
            const settings = await Setting.find(1)

            if (data.field === 'lightAutoMode') {
                settings.merge({ lightAutoMode: data.value })
                //TcpServer.send('ni', `setLightAutoMode;${data.value}`)
            } else if (data.field === 'lightThreshold') {
                settings.merge({ lightThreshold: data.value })
                //TcpServer.send('ni', `setLightThreshold;${data.value}`)
            } else if (data.field === 'heaterState') {
                settings.merge({ heaterState: data.value })
                // COM ARDUINO
            } else if (data.field === 'heaterThreshold') {
                settings.merge({ heaterThreshold: data.value })
                // COM ARDUINO
            } else if (data.field === 'alarmState') {
                settings.merge({ alarmState: data.value })
                //TcpServer.send('pi', `setAlarmState;${data.value}`)
            }

            await settings.save()            
            response.ok()
        } catch (ex) {
            response.internalServerError(ex.toString())
        }
    }
}

module.exports = SettingController
