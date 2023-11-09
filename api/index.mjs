import { app } from '../dist/memory/server/server.mjs';

export default function (req, res) {
	res.status(200).send('Hello from TypeScript API!');
}
