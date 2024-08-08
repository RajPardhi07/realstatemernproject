import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import userRoute from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import listingRouter from './routes/listingRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());

app.use(cookieParser());


app.use('/api/user', userRoute)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`)
})