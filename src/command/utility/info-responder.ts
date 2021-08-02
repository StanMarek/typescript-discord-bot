import { injectable } from "inversify";
import { prefix } from "../message-responder";
import { Message, MessageEmbed } from "discord.js"

@injectable()
export class InfoResponder {
    private server: string[] = ['server', 'srv', 'info', 'serverinfo', 'srvinfo'];
    private user: string[] = ['me', 'aboutme', 'myinfo'];

    public checkCommand(command: string): boolean {
        var cmd = command.slice(prefix.length).trim().split(/ +/);
        for (let i = 0; i < this.server.length; i++) {
            if(cmd[0] === this.server[i])
                return true;
            if(cmd[0] === this.user[i])
                return true;
        }
        return false;
    }

    public execute(message: Message) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        switch (args[0]){
            case 'server':
            case 'srv':
            case 'info':
            case 'serverinfo':
            case 'srvinfo':
                this.displayServerInfo(message);
                break;
            case 'me':
            case 'aboutme':
            case 'myinfo':
                if (!args[1]) {
                    this.displayUserInfo(message);
                    break;
                } 
                if (args[1]) {
                    this.displayUserInfo(message, true)
                    break;
                }
        }
    }

    private displayServerInfo(message: Message) {
        // const information = `Data about sever:\n
        // - server name - ${message.guild.name}\n
        // - server member count - ${message.guild.memberCount}\n
        // - server afk timeout - ${message.guild.afkTimeout}\n
        // - server owner - ${message.guild.owner}\n`

        const exampleEmbed = new MessageEmbed()
	    .setColor('#0099ff')
        .setTitle('Server info')
        .setURL('https://pl.wikipedia.org/wiki/Jan_Pawe%C5%82_II')
        .setDescription('This contains basic info of that server')
        .setThumbnail('https://i.imgur.com/S2aHTTSh.jpg')
        .addFields(
            { name: 'Server name', value: `${message.guild.name}` },
            { name: '\u200B', value: '\u200B' },
            { name: 'Server member count', value: `${message.guild.memberCount}`, inline: true },
            { name: 'Server afk timeout', value: ` ${message.guild.afkTimeout}`, inline: true },
        )
        .addField('Server owner', `${message.guild.owner}`)
        .setImage('https://www.gov.pl/photo/format/7e7cb459-3995-4c53-86c6-e3378e86b828/resolution/1920x810')
        .setTimestamp()
        .setFooter('Hope you enjoy', 'https://i.imgur.com/S2aHTTSh.jpg');
        return message.channel.send(exampleEmbed);
    }

    private displayUserInfo(message: Message, tagged: boolean = false) {
        if (tagged) {
            const taggedUser = message.mentions.users.first();
            const information = `Data about mentioned user:\n
            - nickname - ${taggedUser.username}\n
            - last message - ${taggedUser.lastMessage}\n
            - created at - ${taggedUser.createdAt.toDateString()}\n
            - avatar - ${taggedUser.displayAvatarURL({format: 'png', dynamic: true})}`;
            return message.channel.send(information);
        } else {
            const information = `Data about you:\n
            - nickname - ${message.member.displayName}\n
            - roles - ${message.member.roles.hoist}\n
            - premium since - ${message.member.premiumSince.toDateString()}\n
            - joined at - ${message.member.joinedAt.toDateString()}\n
            - avatar - ${message.author.displayAvatarURL({format: 'png', dynamic: true})}`;
            return message.channel.send(information);
        }
    }

}