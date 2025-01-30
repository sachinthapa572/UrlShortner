import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv/config';

import routes from './routes/routes.js';
import { swaggerUi, specs } from './swaggerConfig.js';

const app = express();

// Database Connection
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log('Database Connected'))
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL }));

app.use('/test', (req, res) => {
  res.send('Welcome to the URL Shortener API');
});

app.use('/api/v1', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// global error handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ status: 400, message: 'Invalid JSON payload passed.' });
  }
  // expressjwt error
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send({ message: 'Unauthorized request , Please login' });
  }
});

// Start Server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(` 🚀👩‍🚀API is running on port ${port}`));
