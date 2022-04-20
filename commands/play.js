const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('plays au')
		.addStringOption((option) =>
			option
				.setName('name of video')
				.setRequired('true'),
		),
	async execute(interaction) {
		const voiceChannel = interaction.member.voice.channel;
		if (!voiceChannel) return interaction.reply('you need to be in a voice channel for this to work');
		const permissions = voiceChannel.permissionsFor(interaction.member);
		if (!permissions.has('CONNECT')) return interaction.reply('you don\'t have permssion to for that channel');
		if (!permissions.has('SPEAK')) return interaction.reply('you don\'t have permssion to speak in this channel');


		const connection = voiceChannel.join();

		const videoFider = async (querey) => {
			const videoResult = await ytSearch(querey);
			return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;

		};

		const video = await videoFider(interaction.options.getString('name of video'));
		if (video) {
			const stream = ytdl(video.url, { filter: 'audioonly' });
			connection.play(stream, { seek: 0, volume: 1 })
				.on('finish', () => {
					voiceChannel.leave();
				});

			await interaction.reply(`now playing ${video.title}`);
		}
		else {
			await interaction. reply('no video matching that title');
		}
	},
};