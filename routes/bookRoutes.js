import express from 'express';
import {
  listBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  getAllBooks
} from '../controllers/bookController.js';
import { authenticate } from '../middleware/middleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getAllBooks)
router.get('/search', listBooks);
router.get('/:bookId', getBookById);
router.post('/', addBook);
router.put('/:bookId', updateBook);
router.delete('/:bookId', deleteBook);

export default router;