import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './App/Routes';
import { globalErrorHanlder } from './App/Error/globalErrorHandler';
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/v1", router);

app.get('/', (req, res) => {
    res.send("Hello Server");
})


//handle error - route not found!
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(globalErrorHanlder);


//Gloabl Error Handler
// app.use((error: any, req: Request, res: Response, next: NextFunction) => {
//   res.status(error.statusCode).json({
//     success: false,
//     message: error.message
//   })
// })

export default app;