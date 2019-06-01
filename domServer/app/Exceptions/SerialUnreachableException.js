'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class SerialUnreachableException extends LogicalException {
}

module.exports = SerialUnreachableException
