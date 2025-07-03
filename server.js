import express from 'express';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import { logger, errorHandler, notFound } from './middleware/middleware.js';
import swaggerDocs from './swagger.js';

const app = express();
app.use(express.json());
app.use(logger);

app.use('/api', authRoutes);
app.use('/api/books', bookRoutes);

swaggerDocs(app)

app.use(notFound);
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));