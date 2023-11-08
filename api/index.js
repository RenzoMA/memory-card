module.exports = async (req, next) => {
	const module = await import('../dist/memory/server/server.mjs');
	const app = module.app;
	return app(req, next);
};
