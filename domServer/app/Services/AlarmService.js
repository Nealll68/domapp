'use strict'

const Setting = use('App/Models/Setting')
const TcpServer = use('App/Services/TcpServer')

class AlarmService {

    async switchState (state) {
        try {            
            const setting = await Setting.find(1)
            setting.merge({ alarmState: state })
            await setting.save()

            TcpServer.send('pi', `alarm${state ? 'On' : 'Off'}`)
        } catch (ex) {
            throw ex
        }
    }

    async launchAlerte () {
        try {
            TcpServer.send('pi', 'alert')
        } catch (ex) {
            throw ex
        }
    }

}

module.exports = new AlarmService()