const { Command } = require('klasa')
const { MessageEmbed } = require('discord.js')
const request = require('request')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      enabled: true,
      description: '',
      extendedHelp: 'No extended help available.'
    })
  }

  async run (message) {
    await request('https://dog.ceo/api/breeds/image/random', { method: 'GET', json: true }, (e, r, b) => {
      message.sendEmbed(new MessageEmbed().setImage(b['message']).setAuthor(message.author.tag, message.author.avatarURL() || 'https://cdn.discordapp.com/embed/avatars/0.png'))
    })
  }
}
