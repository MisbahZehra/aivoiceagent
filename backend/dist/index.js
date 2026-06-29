"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const streamService_1 = require("./services/streamService");
const server = http_1.default.createServer(app_1.default);
(0, streamService_1.setupStreamingServer)(server);
server.listen(env_1.config.port, () => {
    console.log(`Backend running on http://localhost:${env_1.config.port}`);
});
