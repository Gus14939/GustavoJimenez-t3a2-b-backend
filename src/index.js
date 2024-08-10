// import from server.js
const { dbApp } = require("./server");
const { dbConnect } = require("./database");
const cors = require("cors")

dbApp.use(cors({
    origin: "http://localhost:3000",
    // origin: "http://localhost:3000", // have to change to the deployed Netlify URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

const PORT = process.env.PORT || 3333;

// Run server
dbApp.listen(PORT, () => {
    dbConnect();
    console.log(`Planthora App is running`);
});
