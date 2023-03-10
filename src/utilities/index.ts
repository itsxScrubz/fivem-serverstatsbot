import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder } from 'discord.js';
import { Server } from '~/modules';
import type { EmbedMessage } from '~/types';

export const startupLog = (): void =>
	console.log('Server Stats bot created by Scrubz!\nScrubz#0001 | github:itsxScrubz | root@scrubz.dev\n');

const status = ['🟢 Online', '🔴 Offline'] as const;

const addCodeBlocks = (msg: string): string => '```' + msg + '```';

export const generateStatusEmbed = (): EmbedMessage => {
	const date = new Date();
	const fields = [
		{
			name: '> Server Status',
			value: addCodeBlocks(Server.online ? status[0] : status[1]),
			inline: true,
		},
		{
			name: '> Player Count',
			value: addCodeBlocks(`${Server.currentCount} / ${Server.maxPlayers}`),
			inline: true,
		},
	];
	if (!Server.online) fields.pop();
	return {
		embeds: [
			new EmbedBuilder()
				.setColor(Colors.Green)
				.setTitle(process.env.FIVEM_SERVER_NAME)
				.setTimestamp(date)
				.setURL(process.env.BOT_SITE_LINK)
				.setThumbnail(process.env.BOT_EMBED_ICON)
				.addFields(fields)
				.setFooter({
					text: 'Last updated',
				}),
		],
		components: [
			new ActionRowBuilder<ButtonBuilder>().addComponents(
				new ButtonBuilder()
					.setLabel('Visit Website')
					.setStyle(ButtonStyle.Link)
					.setURL(process.env.BOT_SITE_LINK),
				new ButtonBuilder()
					.setLabel('Join Server')
					.setStyle(ButtonStyle.Link)
					.setURL('https://cfx.re/join/' + process.env.BOT_SERVER_ID)
					.setDisabled(!Server.online),
			),
		],
	};
};
