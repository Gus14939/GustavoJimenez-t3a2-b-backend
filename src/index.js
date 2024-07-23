// import from server.js
const { dbApp } = require("./server");
const { dbConnect } = require("./database");



// Run server
dbApp.listen(3000, () => {
    dbConnect();
    console.log(`Planthora App is running`);
});
