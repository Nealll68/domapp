'use strict'

const TcpServer = use('App/Services/TcpServer')
const Light = use('App/Models/Light')
const Setting = use('App/Models/Setting')

class LightService {

    async setState (position, state) {
        try {
            if (position === 'inside') {
                TcpServer.send('ni', `setInLightState;${state}`)
            } else {
                TcpServer.send('ni', `setOutLightState;${state}`)
            } 

            const light = new Light()
            light.lightPosition = position
            light.state = state
            await light.save()
        } catch (ex) {  
            throw ex          
        }
    }


    async switchMode (mode) {
        const setting = await Setting.find(1)

        setting.merge({ lightAutoMode: mode })
        TcpServer.send('ni', `setLightAutoMode;${mode}`)

        await setting.save()
    }

    async setThreshold (threshold) {
        const setting = await Setting.find(1)

        setting.merge({ lightThreshold: threshold })
        TcpServer.send('ni', `lightThreshold;${threshold}`)

        await setting.save()
    }

}

module.exports = new LightService()