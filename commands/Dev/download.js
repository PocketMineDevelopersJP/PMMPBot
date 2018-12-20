const { Command } = require('klasa')
const { MessageEmbed } = require('discord.js')
const request = require('request')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      description: '',
      requiredPermissions: ['EMBED_LINKS'],
      usage: '<master|stable>',
      usageDelim: ' ',
      subcommands: true
    })
  }

  async stable (message) {
    await request('https://update.pmmp.io/api', {
      method: 'GET',
      json: true
    // eslint-disable-next-line handle-callback-err
    }, (error, response, body) => {
      const Embed = new MessageEmbed()
        .setColor(8311585)
        .setTitle('PocketMine-MP (stable)')
        .setDescription(`
        **PHP**: ${body['php_version']}
        **Build Number**: ${body['build_number']}
        **API**: ${body['base_version']}
        **Minecraft Version**: ${body['mcpe_version']}
        `)
        .addField('Download PocketMine-MP.phar', `${body['details_url']}artifact/PocketMine-MP.phar`, true)
        .addField('Download DevTools.phar', `${body['details_url']}artifact/DevTools.phar`)
        .setAuthor(message.author.tag, message.author.avatarURL() || 'https://cdn.discordapp.com/embed/avatars/0.png')
        .setFooter('pmmp/PocketMine-MP', 'https://avatars1.githubusercontent.com/u/22548559?s=200&v=4')
      return message.sendEmbed(Embed)
    })
  }

  async master (message) {
    await request('https://jenkins.pmmp.io/job/PocketMine-MP/lastSuccessfulBuild/artifact/build_info.json/*view*/', {
      method: 'GET',
      json: true
    // eslint-disable-next-line handle-callback-err
    }, (error, response, body) => {
      const Embed = new MessageEmbed()
        .setColor(13632027)
        .setTitle('PocketMine-MP (master)')
        .setDescription(`
        **PHP**: ${body['php_version']}
        **Build Number**: ${body['build_number']}
        **API**: 4.0.0
        **Minecraft Version**: ${body['mcpe_version']}
        `)
        .addField('Download PocketMine-MP.phar', 'https://jenkins.pmmp.io/job/PocketMine-MP/lastSuccessfulBuild/artifact/PocketMine-MP.phar', true)
        .addField('Download DevTools.phar', 'https://jenkins.pmmp.io/job/PocketMine-MP/lastSuccessfulBuild/artifact/DevTools.phar')
        .setAuthor(message.author.tag, message.author.avatarURL() || 'https://cdn.discordapp.com/embed/avatars/0.png')
        .setFooter('pmmp/PocketMine-MP', 'https://avatars1.githubusercontent.com/u/22548559?s=200&v=4')
      return message.sendEmbed(Embed)
    })
  }
}
