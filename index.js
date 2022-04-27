// the needed classes from discord.js
const fs = require('node:fs');
const { Client, Collection, Intents, DiscordAPIError } = require('discord.js');
const { token, MONGODB_SRV } = require('./config.json');
// const { Users } = require('./models/Users.js');
// a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES], partials: ['MESSAGE', 'CHANNEL'] });

const mongoose = require('mongoose');


client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// adds a new item to the collection with the key as the command name and the value as the actual command
	client.commands.set(command.data.name, command);
}

// const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

// for (const file of eventFiles) {
// 	const event = require(`./events/${file}`);
// 	if (event.once) {
// 		client.once(event.name, (...args) => event.execute(...args));
// 	}
// 	else {
// 		client.on(event.name, (...args) => event.execute(...args));
// 	}
//  }

const Usermodel = require('./models/UsersSchema');
client.on('guildMemberAdd', async (member) => {
	console.log(member.user);
	// eslint-disable-next-line prefer-const
	let userprofile = await Usermodel.create({
		userID: member.id,
		serverID: member.guild.id,
		warnings: 0,
	});
	userprofile.save();
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		await interaction.reply({ content: 'there has been an error during execution', ephemeral: true });
	}
});

console.log(MONGODB_SRV);
mongoose.connect(MONGODB_SRV, {
	useNewUrlParser: true,
	useUnifiedTopology: true,

}).then(() => {
	console.log('connected to database');
}).catch((error) => {
	console.log(error);
});

// // when the client is ready it will say ready in the terminal
client.once('ready', () => {
	console.log('ready!');
},
);

client.login(token);