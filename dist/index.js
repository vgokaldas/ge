"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
let app = new server_1.Server().app;
const server = require('http').Server(app);
let port = process.env.PORT;
server.listen(port, () => {
    console.log(`server is listening at port ${port}`);
});
