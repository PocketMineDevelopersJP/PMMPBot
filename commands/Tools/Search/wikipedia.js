const { Command } = require('klasa')
const { MessageEmbed } = require('discord.js')
const request = require('request')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      aliases: ['wiki'],
      description: 'wikipediaで検索します。',
      usage: '<query:str>',
      nsfw: true,
      extendedHelp: [
        '不適切な内容も検索できてしまうのでNSFWチャンネルのみ使用が可能です。'
      ].join(' ')
    })
  }

  async run (messsage, [query]) {
    await request(`https://ja.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`, {
      method: 'GET',
      json: true
    }, (e, r, b) => {
      return b['type'] === 'https://mediawiki.org/wiki/HyperSwitch/errors/not_found'
        ? messsage.sendEmbed(new MessageEmbed().setColor('#ff0000').setThumbnail('https://i.imgur.com/fnhlGh5.png').setTitle('Not found.').setDescription('そんなのないです。'))
        : messsage.sendEmbed(new MessageEmbed().setColor('#0077fff').setThumbnail((b['thumbnail'] && b['thumbnail']['source']) || 'https://i.imgur.com/fnhlGh5.png').setURL(b['content_urls']['desktop']['page']).setTitle(b['title']).setDescription(b['extract']))
    })
  }
}
