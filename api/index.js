module.exports = async (req, res) => {
	const serverModule = await import('../dist/memory/server/server.mjs');
	const app = await serverModule.getServer();
	return app(req, res);
};
