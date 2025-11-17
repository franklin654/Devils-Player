import { Client, Events } from "discord.js";

module.exports = {
    eventName: Events.ClientReady,
    eventHandler: (readyClient: Client<true>) => {
        console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    },
    once: true
}