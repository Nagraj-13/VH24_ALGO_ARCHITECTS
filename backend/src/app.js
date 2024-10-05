import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes import
import authRoutes from './routes/auth/auth.route.js'
import instituteRoutes from './routes/institute.route.js'
import supplierRoutes from './routes/supplier.route.js'
//routes declarations
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/institute',instituteRoutes);
app.use('/api/v1/supplier',supplierRoutes);
export { app };
