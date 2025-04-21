"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Routes_1 = __importDefault(require("./App/Routes"));
const globalErrorHandler_1 = require("./App/Error/globalErrorHandler");
const app = (0, express_1.default)();
//middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1", Routes_1.default);
app.get('/', (req, res) => {
    res.send("Hello Server");
});
//handle error - route not found!
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
app.use(globalErrorHandler_1.globalErrorHanlder);
//Gloabl Error Handler
// app.use((error: any, req: Request, res: Response, next: NextFunction) => {
//   res.status(error.statusCode).json({
//     success: false,
//     message: error.message
//   })
// })
exports.default = app;
