'use strict'

const Setting = use('App/Models/Setting')

class HeaterService {

    async switchState (state) {
        const setting = await Setting.find(1)

        setting.merge({ heaterState: state })
        // COM ARDUINO

        await setting.save()
    }

    async setThreshold (threshold) {
        const setting = await Setting.find(1)

        setting.merge({ heaterThreshold: threshold })
        // COM ARDUINO

        await setting.save()
    }

}

module.exports = new HeaterService()