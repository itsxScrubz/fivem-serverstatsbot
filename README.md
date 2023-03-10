# fivem-serverstatsbot

A discord bot that posts FiveM server status and player count to a designated channel.

![exampleImage](https://i.imgur.com/j05vVlP.png)

---

## Current Features

The bot will post a message in a predetermined channel (if none exists) or edit the message and update it with the current server status and player count.

I **HIGHLY** recommend using [pm2](https://www.npmjs.com/package/pm2) if you are self hosting the bot.

---

### - IMPORTANT -

I am editing the previous message by grabbing the last message posted. I am **NOT** checking to see what this last message was. So the channel this posts in **NEEDS** to be dedicated to this bot/stats embed **ONLY** with **NO OTHER POSTS** inside it. I'm lazy and didn't wanna do any logic to get around this. xD

---

### Notes

As of v1.0 it ONLY handles displaying server online status and player count **ON A SINGLE SERVER** at a time.

I'm not 100% sure if I'm going to take this any further, since this was just a way for me to familiarize myself with the discord.js lib.

I also have **NO** plans on actively supporting this outside of fixing bugs.

#### Please note, when the server is offline, the `Join Server` button will be disabled.

---

## Environment variables

-   `DISCORD_TOKEN` => This is the bot token you are provided in the section below.
-   `UPDATE_CHANNEL_ID` => The channel the bot will post updates to.
-   `FIVEM_SERVER_NAME` => Bot will have `Watching MyServerName` as a status and will also be displayed on the embed message.
-   `BOT_SERVER_ID` => This is the CFX server invite code.
-   `BOT_SITE_LINK` => This will open a browser url to your site when either clicking the `Visit Website` button OR clicking the header text that displays your server name inside the embed.
-   `BOT_EMBED_ICON` => This is the image that will be displayed inside the embed message.
-   `BOT_CHECKSTATUS_INTERVAL` => This is the time in seconds between checking/updating the server status/player count.

---

# Installation

## General

-   Rename `.env.example` to `.env`.
-   Follow all the steps below to set up the bot.
-   After ALL the env variables are set, then you can build and start the bot.

## Discord

-   Go [here](https://discord.com/developers/applications) to the discord developers panel.
-   Click the `New Application` button on the top right and give it a name.
-   You can fill out the name, description, and tags as you see fit.
-   Then click `Bot` on the left hand panel.
-   Click the `Add Bot` button.
-   Give your bot a name, and avatar icon.
-   Click the `Copy` button under the token section and set it via the `DISCORD_TOKEN` env variable.
-   On the left hand panel, click `OAuth2` then `URL Generator`.
-   Select `bot` under scopes, then select the following required permissions: `Read Messages/View Channels`, `Embed Links`. You may set other permissions that will be needed if you plan to add to the code yourself.
-   Copy the generated url below the permissions, and paste it in the browser to invite the bot to your server.
-   You will need to create a channel to post the server stats to. Create the channel, right click it, and click `Copy ID`, and that id will be used as the `BOT_SITE_LINK` env variable. If you don't see `Copy ID`, then go to `Discord User Settings => Advanced => Developer Mode` and turn it on.
-   Finally, set all the other env variables, and you're good to go!
