const { Command } = require('klasa')
const { MessageEmbed } = require('discord.js')
const request = require('request')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      requiredPermissions: [],
      description: '',
      extendedHelp: 'No extended help available.',
      usage: '<query:str>',
      usageDelim: ' '
    })
  }

  async run (message, [query]) {
    await request('https://poggit.pmmp.io/plugins.json', { method: 'GET', json: true }, (e, r, b) => {
      const Embed = new MessageEmbed()
        .setTitle(`検索結果: ${query}`)
      b.filter((item, index) => {
        if (item['name'] === query) {
          Embed.addField(`${item['name']} v${item['version']}`, item['html_url'])
        }
      })
      return message.sendEmbed(Embed)
    })
  }
}
