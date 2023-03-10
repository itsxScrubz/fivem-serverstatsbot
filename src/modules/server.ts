import type { CFXServerAPIData } from '~/types';

export default class {
	private static id: string;
	private static serverList = 'https://servers-frontend.fivem.net/api/servers/single/';
	static serverName: string;
	static maxPlayers: number;
	static currentCount: number;
	static online = false;
	static interval: number;
	/**
	 * ! Can only monitor 1 server at a time currently.
	 *
	 * Starts the server class and populates the provided server data.
	 * @param serverID {string} CFX server id.
	 * @returns {Promise<void>} void.
	 */
	static async init(serverID: string): Promise<void> {
		this.id = serverID;
		this.serverName = process.env.FIVEM_SERVER_NAME;
		this.interval = Number(process.env.BOT_CHECKSTATUS_INTERVAL);
		// Set initial server stats.
		await this.getStats();
		// Start update interval.
		setInterval(() => {
			void this.getStats();
		}, this.interval * 1000);
	}
	/**
	 * Check for and update the server stats.
	 * @returns {Promise<void>} void
	 */
	static async getStats(): Promise<void> {
		// TODO: Logging
		console.log('Fetching server stats...');
		// Fetch stats.
		const stats = await fetch(this.serverList + this.id, {
			headers: { 'User-Agent': 'cfx' },
		}).then(res => {
			if (res.ok) return res.json() as Promise<CFXServerAPIData | false>;
			return false;
		});
		// Server not online / not found.
		// If server is online, but bot isn't registering it as online...then your invite id may be wrong.
		if (!stats) {
			if (!this.online) return;
			if (this.online) this.online = false;
			this.maxPlayers = 0;
			this.currentCount = 0;
			return;
		}
		// Server online.
		if (!this.online) this.online = true;
		this.maxPlayers = stats.Data.sv_maxclients;
		this.currentCount = stats.Data.clients;
	}
}
