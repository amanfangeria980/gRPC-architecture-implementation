const client = require("./client");
const express = require("express");
const app = express();
const port = 4001;
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

// TODO to expose rest call
// which internally calls the gRPC server function using gRPC client

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
