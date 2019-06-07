'use strict'

const Setting = use('App/Models/Setting')
const SerialService = use('App/Services/SerialService')

class HeaterService {

    async switchState (state) {
        const setting = await Setting.find(1)
        setting.merge({ heaterState: state })
        await setting.save()

        if (typeof(state) === 'boolean') {
            state = state ? 1 : 0
        }

        await SerialService.send(`heaterS;${state}`)
    }

    async setThreshold (threshold) {
        const setting = await Setting.find(1)
        setting.merge({ heaterThreshold: threshold })
        await setting.save()

        await SerialService.send(`heaterT;${threshold}`)
    }

}

module.exports = new HeaterService()