'use strict'

const Task = use('Task')
const ScenarioModel = use('App/Models/Scenario')

const LightService = use('App/Services/LightService')
const HeaterService = use('App/Services/HeaterService')
const AlarmService = use('App/Services/AlarmService')

const moment = require('moment')

class Scenario extends Task {
    static get schedule () {
        return '*/60 * * * * *'
    }

    async handle () {        
        const scenarios = await ScenarioModel.all()
        
        for (const x of scenarios.toJSON()) {            
            if (x.isRecurrent) {
                const currTime = moment()
                const execTime = moment(x.time, 'HH:mm')
                currTime.toString()
                execTime.toString()

                if ((moment().format('e') === x.day || x.day === '-1') && currTime.isSame(execTime, 'minute')) {
                    console.log('exec recurrent action')
                    await this.handleAction(x.action)
                }
            } else {
                if (moment().isSame(x.execution_at, 'minute')) {
                    console.log('exec no recurrent action')
                    await this.handleAction(x.action)

                    const scenarioToDelete = await Scenario.find(x.id)
                    await scenarioToDelete.delete()
                }
            }
        }
    }

    async handleAction (action) {
        if (action === 'lightInsideOn') {
            await LightService.setState('inside', true)
        } else if (action === 'lightInsideOff') {
            await LightService.setState('inside', false)
        } else if (action === 'lightOutsideOn') {
            await LightService.setState('outside', true)
        } else if (action === 'lightOutsideOff') {
            await LightService.setState('outside', false)
        } else if (action === 'alarmOn') {
            await AlarmService.switchState(true)
        } else if (action === 'alarmOff') {
            await AlarmService.switchState(false)
        } else if (action === 'heaterOn') {
            await HeaterService.switchState(true)
        } else if (action === 'heaterOff') {
            await HeaterService.switchState(false)
        }
    }
}

module.exports = Scenario