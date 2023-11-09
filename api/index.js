module.exports = async (req, res) => {
	const serverModule = await import('../dist/memory/server/server.mjs');
	// Assuming getServer is an async function that returns an Express application
	const app = await serverModule.getServer();

	return app(req, res);
};
