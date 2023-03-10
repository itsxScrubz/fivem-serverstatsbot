#!/usr/bin/env node
import 'dotenv/config';
import { Bot } from '~/modules';

// Create bot.
const bot = new Bot(process.env.DISCORD_TOKEN);

// Init.
void bot.init();
