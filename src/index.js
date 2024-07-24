// import from server.js
const { dbApp } = require("./server");
const { dbConnect } = require("./database");

const PORT = process.env.PORT || 3000;

// Run server
dbApp.listen(PORT, () => {
    dbConnect();
    console.log(`Planthora App is running`);
});
