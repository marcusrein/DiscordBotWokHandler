import {
	MessageActionRow,
	MessageSelectMenu,
	MessageSelectOptionData,
	Role,
	TextChannel,
} from "discord.js";
import { ICommand } from "wokcommands";

export default {
	category: "Configuration",
	description: "Adds a role to the auto role message",

	permissions: ["ADMINISTRATOR"],

	minArgs: 3,
	maxArgs: 3,

	expectedArgs: "<channel> <messageId> <role>",
	expectedArgsTypes: ["CHANNEL", "STRING", "ROLE"],

	slash: "both",
	testOnly: true,
	guildOnly: true,

	callback: async ({ message, interaction, args, client }) => {
		const channel = (
			message
				? message.mentions.channels.first()
				: interaction.options.getChannel("channel")
		) as TextChannel;
		if (!channel || channel.type !== "GUILD_TEXT") {
			return "Please tag a text channel";
		}

		const messageId = args[1];

		const role = (
			message
				? message.mentions.roles.first()
				: interaction.options.getRole("role")
		) as Role;
		if (!role) {
			return "Unknown role!";
		}

		const targetMessage = await channel.messages.fetch(messageId, {
			cache: true,
			force: true,
		});
		if (!targetMessage) {
			return "Unknown message ID";
		}

		if (targetMessage.author.id !== client.user?.id) {
			return `Please provide a message ID that was sent from ${client.user?.id}`;
		}
		let row = targetMessage.components[0] as MessageActionRow;
		if (!row) {
			row = new MessageActionRow();
		}

		const option: MessageSelectOptionData[] = [
			{
				label: role.name,
				value: role.id,
			},
		];
		let menu = row.components[0] as MessageSelectMenu;
		if (menu) {
			for (const o of menu.options) {
				if (o.value === option[0].value) {
					return {
						custom: true,
						content: `<@&${o.value}> is already part of this menu`,
						allowedMentions: {
							roles: [],
						},
						ephemeral: true,
					};
				}
			}
		}
		menu.addOptions(options);
		menu.setMaxValues;
	},
} as ICommand;
