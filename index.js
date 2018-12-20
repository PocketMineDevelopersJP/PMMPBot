const { Client } = require('klasa')
const { config, token } = require('./config')

class PMMPBotClient extends Client {}

new PMMPBotClient(config).login(token)
