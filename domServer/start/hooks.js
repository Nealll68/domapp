'use strict'

const { hooks } = require('@adonisjs/ignitor')

hooks.after.httpServer(() => {
    use('App/Services/TcpServer')
    use('App/Services/SerialService')
})
