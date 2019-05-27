'use strict'

const Setting = use('App/Models/Setting')
const TcpServer = use('App/Services/TcpServer')

class AlarmService {

    async switchState (state) {
        const setting = await Setting.find(1)

        setting.merge({ alarmState: state })
        TcpServer.send('pi', `alarm${data.value ? 'On' : 'Off'}`)

        await setting.save()
    }

}

module.exports = new AlarmService()