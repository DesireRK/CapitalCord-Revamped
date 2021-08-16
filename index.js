const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { getModule } = require('powercord/webpack');
const { findInReactTree } = require('powercord/util');

module.exports = class CaptialCord extends Plugin {
	startPlugin() {
		const Message = getModule(m => (m.__powercordOriginal_default || m.default)?.toString().includes('childrenRepliedMessage'), false);

		inject('captialcord', Message, 'default', (_, res) => {
			const msg = findInReactTree(res, n => n.message);
			if (msg.message.author.id === getModule(['getCurrentUser'], false).getCurrentUser()?.id) return res;
			msg.message.content = msg.message.content.replace(/powercord|Power cord|power cord|Powercord/g, 'powerCord');
			return res;
		});

		Message.default.displayName = 'Message';
	}

	pluginWillUnload() {
		uninject('captialcord');
	}
};
