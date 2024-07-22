// import from server.js
const { planthoraApp, PORT, HOST } = require("./server");

// Run server
planthoraApp.listen(PORT, HOST, () => {
    console.log(`Planthora App is running on ${HOST}:${PORT}`);
});