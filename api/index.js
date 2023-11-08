module.exports = async () => {
	const module = await import('../dist/memory/server/server.mjs');
	const app = module.app;
	return app();
};
