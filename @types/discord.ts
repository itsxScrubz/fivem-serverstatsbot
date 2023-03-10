import type { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from 'discord.js';

export type EmbedMessage = {
	embeds: EmbedBuilder[];
	components: ActionRowBuilder<ButtonBuilder>[];
};

export type MessagePostTypes = string | EmbedMessage;
