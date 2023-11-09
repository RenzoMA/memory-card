// Assuming this is a file that uses CommonJS syntax

// Use async function to handle the dynamic import
module.exports = async () => {
	// Dynamically import the ES module
	const server = await import('../dist/memory/server/main.server.mjs');
    throw new Error(JSON.stringify(server));
	// Return the app from the imported module
	return server.app();
};
