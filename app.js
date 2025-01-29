import express from 'express';
import { config } from './src/config/config.js';
import ordersRoutes from './src/routes/orders.routes.js';
import buyerRoutes from './src/routes/buyer.routes.js';
import businessRoutes from './src/routes/business.routes.js';
import DbConnection from './src/config/dbConnection.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './src/config/auth.config.js';
import authRoutes from './src/routes/auth.routes.js';
import cors from 'cors';
import { generateCustomResponses } from './src/utils/generateCustomResponses.js';
import productRoutes from "./src/routes/products.routes.js";



const app = express();
const PORT = config.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: config.CORS_ORIGIN || "http://localhost:8080",
    methods: config.CORS_METHODS || ["GET", "POST", "PUT", "DELETE"]
}));

app.use(passport.initialize());
initializePassport();
app.use(generateCustomResponses);

app.use('/api/orders', ordersRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/buyer', buyerRoutes);
app.use('/api/auth', authRoutes);
app.use("/api", productRoutes);

DbConnection.getInstance();
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(` Port ${PORT} is already in use. Trying another port...`);
        setTimeout(() => {
            app.listen(PORT + 1, () => console.log(` Server running on port ${PORT + 1}`));
        }, 1000);
    } else {
        console.error(" Server error:", err);
    }
});
