import serverless from 'serverless-http';
import { app } from '../dist/memory/server/server.mjs';

module.exports = async (req, res) => {
	const handler = serverless(app);
	return handler(req, res);
};
