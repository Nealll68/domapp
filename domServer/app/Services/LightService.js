'use strict'

const TcpServer = use('App/Services/TcpServer')
const Light = use('App/Models/Light')

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

}

module.exports = new LightService()