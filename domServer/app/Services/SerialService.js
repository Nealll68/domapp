'use strict'

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

const Temperature = use('App/Models/Temperature')
const Humidity = use('App/Models/Humidity')
const Setting = use('App/Models/Setting')
const AlarmService = use('App/Services/AlarmService')

const SerialUnreachableException = use('App/Exceptions/SerialUnreachableException')

class SerialService {
    constructor () {
        this.port = new SerialPort('\\\\.\\COM3', {
            baudRate: 9600
        })

        this.parser = this.port.pipe(new Readline())        

        this.port.on('error', (err) => {
            console.log('SerialPort error : ', err.message)
        })

        this.parser.on('data', (data) => {
            console.log(data)
            this.handleData(data)
        })
    }

    send (data) {
        return new Promise((resolve, reject) => {
            try {
                this.port.write(data)
                resolve()
            } catch (ex) {
                console.log(ex)
                reject(new SerialUnreachableException('Impossible de joindre l\'Arduino'))
            }
        })
    }

    async handleData (data) {
        // Split string and handle data
        let dataSplit = data.toString().split(';')

        try {
            if (dataSplit[0] === 'init') {            
                const allSettings = await Setting.find(1)
                const initMessage = `init2;${allSettings.heaterState};${allSettings.heaterThreshold}`
                this.send(initMessage)
            } else if (dataSplit[0] === 'temperature') {
                const temperature = new Temperature()
                temperature.temp = Number.parseFloat(dataSplit[1]).toFixed(0)
                await temperature.save()
            } else if (dataSplit[0] === 'humidity') {
                const humidity = new Humidity()
                humidity.humidity = Number.parseFloat(dataSplit[1]).toFixed(0)
                await humidity.save()
            } else if (dataSplit[0] === 'alarm') {
                await AlarmService.launchAlert()
            }
        } catch (ex) {
            console.log(ex)
        }
    }
}

module.exports = new SerialService()