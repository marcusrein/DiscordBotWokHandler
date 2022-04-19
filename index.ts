import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";
import WOKCommands from "wokcommands";
import path from "path";
// import mongoose from "mongoose";
import testSchema from "./test-schema";

dotenv.config();

const client = new DiscordJS.Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	],
});

client.on("ready", async () => {
	console.log("The Bot is ready");

	const guildId = "957994950711193600";
	const guild = client.guilds.cache.get(guildId);
	let commands;

	new WOKCommands(client, {
		// The name of the local folder for your command files
		commandsDir: path.join(__dirname, "commands"),
		featuresDir: path.join(__dirname, "features"),

		// Allow importing of .ts files if you are using ts-node
		typeScript: true,
		testServers: ["957994950711193600"],

		// Allow easy Database connections:
		mongoUri: process.env.DATABASE_URI,
		dbOptions: {
			keepAlive: true,
		},
	});

	//Database Management

	// Mongoose Code If not wanting to use WOKCommands
	// await mongoose.connect(process.env.DATABASE_URI || "", {
	// 	keepAlive: true,
	// });

	// SIMULATES WAITING FOR API WITH TIMEOUT. UNSURE HOW TO IMPLEMENT THIS WITH MONGODB+WOKCommands.
	// setTimeout(async () => {
	// 	await new testSchema({
	// 		message: "hello world!",
	// 	}).save();
	// }, 1000);

	// ASSIGNS OUR COMMANDS TO CLIENT IF WE HAVE A GUILD ASSIGNED
	if (guild) {
		commands = guild.commands;
	} else {
		commands = client.application?.commands;
	}

	// TRANSFERRED THIS CODE VVVV OVER TO COMMANDS FOLDER.

	// commands?.create({
	// 	name: "ping",
	// 	description: "Replies with pong",
	// });

	// 	commands?.create({
	// 		name: "add",
	// 		description: "Adds two numbers",
	// 		options: [
	// 			{
	// 				name: "num1",
	// 				description: "The first number",
	// 				required: true,
	// 				type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
	// 			},
	// 			{
	// 				name: "num2",
	// 				description: "The second number",
	// 				required: true,
	// 				type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
	// 			},
	// 		],
	// 	});
});

// client.on("interactionCreate", async (interaction) => {
// 	if (!interaction.isCommand()) {
// 		return;
// 	}

// 	const { commandName, options } = interaction;

// if (commandName === "ping") {
// 	await interaction.editReply({
// 		content: "pong",
// 	});
// if (commandName === "add") {
// 	const num1 = options.getNumber("num1")!;
// 	const num2 = options.getNumber("num2")!;

// 	await interaction.deferReply({
// 		ephemeral: true,
// 	});

// 	await new Promise((resolve) => setTimeout(resolve, 5000));

// 	await interaction.editReply({
// 		content: `The sum is ${num1 + num2}`,
// 	});
// }
// });

// client.on("messageCreate", (message) => {
// 	if (message.content === "ping") {
// 		message.reply({
// 			content: "pong!",
// 		});
// 	}
// });

client.login(process.env.TOKEN);
