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

app.get("/customers", (req, res) => {
    client.getAll(null, (err, data) => {
        res.send(data.customers);
    });
});
app.post("/create", (req, res) => {
    let newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
    };
    client.insert(newCustomer, (err, data) => {
        if (err) throw err;
        console.log("Customer created successfully");
        res.send({
            message: "Customer created successfully",
        });
    });
});
app.post("/update", (req, res) => {
    let updateCustomer = {
        id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
    };
    client.insert(updateCustomer, (err, data) => {
        if (err) throw err;
        console.log("Customer updated successfully");
        res.send({
            message: "Customer updated successfully",
        });
    });
});

app.post("/remove", (req, res) => {
    client.remove({ id: req.body.customer_id }, (err, data) => {
        if (err) throw err;
    });
    console.log("Customer removed successfully");
    res.send({
        message: "Customer removed successfully",
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
