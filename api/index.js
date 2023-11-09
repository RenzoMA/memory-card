module.exports = async (req, res) => {
	const serverModule = await import('../dist/memory/server/server.mjs');
	const server = serverModule.default || serverModule;

	// Assuming getServer is an async function that returns an Express application
	const app = await server.getServer();

	return app(req, res);
};
