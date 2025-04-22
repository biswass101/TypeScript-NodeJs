"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Routes_1 = __importDefault(require("./App/Routes"));
const globalErrorHandler_1 = require("./App/Middlewares/globalErrorHandler");
const notFound_1 = __importDefault(require("./App/Middlewares/notFound"));
const app = (0, express_1.default)();
//middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1", Routes_1.default);
app.get('/', (req, res) => {
    res.send("Hello Server");
});
app.use(notFound_1.default);
app.use(globalErrorHandler_1.globalErrorHanlder);
exports.default = app;
