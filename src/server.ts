import app from './app';
import { connectDB } from './config/databas';
import { config } from './config/config'

const PORT = config.port;
connectDB();

//server
app.listen(PORT, () => {
    console.log(`Server is listening at: http://localhost:${PORT}`);
})