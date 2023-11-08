import serverless from 'serverless-http';

module.exports = async (req, res) => {
	const { app } = await import('../dist/memory/server/server.mjs');
	const handler = serverless(app);
	return handler(req, res);
};
