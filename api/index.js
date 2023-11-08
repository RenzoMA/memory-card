import serverless from 'serverless-http';
import app from '../dist/memory/server/server.mjs';

export default serverless(app);

