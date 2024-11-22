import express from 'express';
import 'dotenv/config'
import router from './routes/route.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use("/", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});