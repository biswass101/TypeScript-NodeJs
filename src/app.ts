import express from 'express';
import cors from 'cors';
import router from './App/Routes';
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/v1", router);

app.get('/', (req, res) => {
    res.send("Hello Server");
})

export default app;