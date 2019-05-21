'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class TcpUnknownClientException extends LogicalException {

}

module.exports = TcpUnknownClientException
