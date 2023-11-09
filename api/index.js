// Assuming this is a file that uses CommonJS syntax

// Use async function to handle the dynamic import
module.exports = async () => {
	// Dynamically import the ES module
	const { app } = await import('../dist/memory/server/server.mjs');

	// Return the app from the imported module
	return app();
};
