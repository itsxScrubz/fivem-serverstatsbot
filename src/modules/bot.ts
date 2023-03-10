import type { Message as MessageClassType } from 'discord.js';
import { ActivityType, Client, GatewayIntentBits, TextChannel } from 'discord.js';
import { Server } from '~/modules';
import type { MessagePostTypes } from '~/types';
import { generateStatusEmbed, startupLog } from '~/utilities';

const intents = [
	GatewayIntentBits.Guilds,
	// GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildIntegrations,
	GatewayIntentBits.GuildWebhooks,
	GatewayIntentBits.GuildVoiceStates,
	// GatewayIntentBits.GuildPresences,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildMessageReactions,
] as const;

export default class extends Client {
	constructor(token: string) {
		super({
			intents,
		});
		this.token = token;
		// TODO: Logging
		startupLog();
		console.log('Initializing bot...');
		this.once('ready', () => {
			this.user.setStatus('online');
			this.user.setActivity(Server.serverName, {
				type: ActivityType.Watching,
			});
			// TODO: Logging
			console.log('Bot started!!');
			// Post initial status update.
			void this.postMessage(process.env.UPDATE_CHANNEL_ID, generateStatusEmbed(), true);
		});
	}
	/**
	 * Init the server module and login the bot to start it.
	 * @returns {Promise<string>}
	 */
	async init(): Promise<string> {
		// Init server class.
		await Server.init(process.env.BOT_SERVER_ID);
		// Login and post immediate status update.
		return this.login(this.token);
	}
	/**
	 *
	 * @param channelID {string} ID of the text channel to fetch.
	 * @returns {Promise<TextChannel>} Text Channel.
	 */
	async fetchTextChannel(channelID: string): Promise<TextChannel> {
		try {
			return (await this.channels.fetch(channelID)) as TextChannel;
		} catch {
			throw new Error('Update channel id provided is NOT valid');
		}
	}
	// @param channelID — The id of the channel to send the message to.
	/**
	 *
	 * @param channelID {string} The id of the channel to send the message to.
	 * @param message {MessagePostTypes} The message to post (string|embed).
	 * @param editLast {boolean=} Edit last message??
	 * @returns {Promise<MessageClassType>} Discord message class.
	 */
	async postMessage(
		channelID: string,
		message: MessagePostTypes,
		editLast?: boolean,
	): Promise<MessageClassType<boolean>> {
		// Grab update channel.
		const channel = await this.fetchTextChannel(channelID);
		if (typeof message === 'string') return channel.send(message);
		if (!editLast) return channel.send(message);
		try {
			// Edit previous message.
			const lastMessage = await channel.messages.fetch(channel.lastMessageId);
			return lastMessage.edit(message);
		} catch {
			// Previous message not found. Post new one.
			return channel.send(message);
		}
	}
}
