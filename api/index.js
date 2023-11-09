module.exports = async () => {
    // Dynamically import the ES module
    const { app } = await import('../dist/memory/server/server.mjs');
    
    // Return the app from the imported module
    return app;
  };