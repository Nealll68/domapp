'use strict'

const Config = use('Config')
const net = require('net')

const Alarm = use('App/Models/Alarm')
const Luminosity = use('App/Models/Luminosity')
const Setting = use('App/Models/Setting')
const Light = use('App/Models/Light')

const TcpUnknownClientException = use('App/Exceptions/TcpUnknownClientException')

class TcpServer {
    constructor () {
        let config = Config.get('tcpServer')
        let self = this
        this.clients = {}
        this.ipNameRelation = {}        

        this.server = net.createServer()

        this.server.listen(config.port, config.ip, () => {
            console.log(`TCP Server on port ${config.port}`)
        })

        this.server.on('connection', (socket) => {
            console.log(`CONNECTED: ${socket.remoteAddress}:${socket.remotePort}`)           

            socket.on('data', (data) => {
                console.log(`DATA ${socket.remoteAddress} : ${data}`)
                let dataSplit = data.toString().split(';')
                
                if (!(dataSplit[0] in self.clients)) {
                    // New client
                    self.clients[dataSplit[0]] = socket

                    if (dataSplit[0] === 'ni') {
                        self.ipNameRelation[socket.remoteAddress] = 'ni'
                    } else {
                        self.ipNameRelation[socket.remoteAddress] = 'pi'
                    }

                    console.log(`${dataSplit[0]} identified`)
                } else {
                    // Already know client
                    // handle functions
                    if (dataSplit[0] === 'ni') {
                        if (typeof dataSplit[2] === 'undefined') {
                            self.handleNI(dataSplit[1])
                        } else {
                            self.handleNI(dataSplit[1], dataSplit[2])
                        }
                    } else if (dataSplit[0] === 'pi') {
                        if (typeof dataSplit[2] === 'undefined') {
                            self.handlePI(dataSplit[1])
                        } else {
                            self.handlePI(dataSplit[1], dataSplit[2])
                        }
                    }
                }
            })

            socket.on('close', (data) => {
                console.log(`CLOSED: ${socket.remoteAddress}:${socket.remotePort}`)
                delete self.clients[self.ipNameRelation[socket.remoteAddress]]
                delete self.ipNameRelation[socket.remoteAddress]                
            })

            socket.on('error', (err) => {
                console.log(err)
            })
        })
    }

    send (client, data) {
        if (client in this.clients) {
            this.clients[client].write(data.toString())            
        } else {
            if (client === 'ni') {
                throw new TcpUnknownClientException('Impossible de joindre la carte NI')
            } else {
                throw new TcpUnknownClientException('Impossible de joindre la Raspberry Pi')
            }
        }
    }

    async handleNI (reqType, reqValue = null) {
        if (reqType === 'identification') {
            const inLightState = await Light.query().where('lightPosition', 'inside').orderBy('id', 'desc').limit(1).fetch()
            const outLightState = await Light.query().where('lightPosition', 'outside').orderBy('id', 'desc').limit(1).fetch()
            const inLightStateJSON = inLightState.toJSON()
            const outLightStateJSON = outLightState.toJSON()

            const allSettings = await Setting.find(1)

            this.send('ni', `init;${inLightStateJSON[0].state};${outLightStateJSON[0].state};${allSettings.lightThreshold};${allSettings.lightAutoMode}`)

            console.log('NI identification handled')
        } else if (reqType === 'init') {
            const settings = await Setting.find(1)
            this.send('ni', `init;${settings.lightAutoMode};${settings.lightThreshold}`)
        } else if (reqType === 'luminosity') {
            const luminosity = new Luminosity()
            luminosity.lum = reqValue
            await luminosity.save()
        }
    }

    async handlePI (reqType, reqValue = null) {
        if (reqType === 'identification') {                        
            console.log('PI identification handled')            
        } else if (reqType === 'init') {
            const settings = await Setting.find(1)
            this.send('pi', `init;${settings.alarmState}`)
        } else if (reqType === 'alert') {
            const alarm = new Alarm()

            alarm.alarmState = reqValue

            await alarm.save()
        } else if (reqType === 'alarm') {
            const settings = new Setting()

            settings.merge({ alarmState: reqValue })

            await settings.save()
        }
    }
}

module.exports = new TcpServer()