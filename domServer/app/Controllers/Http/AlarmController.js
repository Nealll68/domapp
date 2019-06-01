'use strict'

const Alarm = use('App/Models/Alarm')

class AlarmController {

    async get ({ response }) {
        try {
            const alarms = await Alarm.query().where('alarmState', '1').orderBy('id', 'desc').fetch()

            response.ok({
                "alarms": alarms.toJSON()
            })
        } catch (ex) {
            response.internalServerError(ex.toString())
        }
    }

    async getLastAlert ({ response }) {
        try {
            const alarm = await Alarm.query().orderBy('id', 'desc').limit(1).fetch()
            const alarmJSON = alarm.toJSON()

            response.ok({
                "alarm": alarmJSON[0].alarmState,
                "date": alarmJSON[0].created_at
            })
        } catch (ex) {
            response.internalServerError(ex.toString())
        }
    }

}

module.exports = AlarmController
