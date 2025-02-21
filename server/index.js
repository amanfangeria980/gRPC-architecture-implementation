const PROTO_PATH = "./customer.proto";

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const customersProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
const customers = [
    {
        id: "afdsafsas",
        name: "Aman",
        age: 21,
        address: "Giridih",
    },
    {
        id: "fsfdsfsff",
        name: "Parth",
        age: 22,
        address: "Najibabad",
    },
];

server.addService(customersProto.CustomerService.service, {
    getAll: (call, callback) => {
        callback(null, { customers });
    },
    get: (call, callback) => {
        let customer = customer.find((n) => n.id === call.request.id);
        if (customer) {
            callback(null, customer);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Customer not found",
            });
        }
    },
    insert: (call, callback) => {
        let customer = call.request;
        customer.id = Date.now().toString();
        customers.push(customer);
        callback(null, customer);
    },
    update: (call, callback) => {
        let existingCustomer = customers.find((n) => n.id === call.request.id);
        if (existingCustomer) {
            existingCustomer.name = call.request.name;
            existingCustomer.age = call.request.age;
            existingCustomer.address = call.request.address;
            callback(null, existingCustomer);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Customer not found",
            });
        }
    },
    remove: (call, callback) => {
        let existingCustomer = customers.find((n) => n.id === call.request.id);
        if (existingCustomer) {
            customers = customers.filter((n) => n.id !== call.request.id);
            callback(null, existingCustomer);
        }
    },
});

server.bindAsync(
    "127.0.0.1:30043",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        if (error) {
            console.error("Failed to bind server:", error);
            return;
        }
        console.log(`gRPC server running at http://127.0.0.1:${port}`);
    }
);
