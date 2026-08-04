import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';

import userRouter from './routes/users.routes.js';
import authRouter from './routes/auth.routes.js';
import orderRouter from './routes/orders.routes.js';
import categoryRouter from './routes/categories.routes.js';
import productRouter from './routes/products.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/products', productRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to the Moss API!');
})

app.listen(PORT, async () => {
    console.log(`Moss API running on http://localhost:${PORT}`);

    await connectToDatabase();
});

export default app;