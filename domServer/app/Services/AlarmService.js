'use strict'

const Setting = use('App/Models/Setting')
const TcpServer = use('App/Services/TcpServer')
const Alarm = use('App/Models/Alarm')

class AlarmService {

    async switchState (state) {
        try {            
            const setting = await Setting.find(1)
            setting.merge({ alarmState: state })
            await setting.save()
            
            await TcpServer.send('pi', `alarm${state ? 'On' : 'Off'}`)
        } catch (ex) {
            console.log(ex)
            throw ex
        }
    }

    async launchAlert () {
        try {
            const alarm = new Alarm()
            alarm.alarmState = 1
            await alarm.save()

            await TcpServer.send('pi', 'alert')
        } catch (ex) {
            throw ex
        }
    }

}

module.exports = new AlarmService()