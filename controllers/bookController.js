import { v4 as uuid } from 'uuid';
import { getBooks, saveBooks } from '../model/bookModel.js';


//API to get all books
export const getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const books = await getBooks();
    if (!books) {
      return res.status(404).json({ message: "Books not found" })
    }

    const start = (page - 1) * limit;
    const paginated = books.slice(start, start + +limit);
    res.json(paginated);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error })
  }
}


//API to filter books by genre
export const listBooks = async (req, res) => {
  try {
    const { genre, page = 1, limit = 10 } = req.query;
    console.log(genre);

    if (!genre) {
      return res.status(400).json({ message: 'Give genre for filter books' });
    }
    const books = await getBooks();
    console.log(books);

    if (!books) {
      return res.status(404).json({ message: "Books not found" })
    }

    const filteredBook = books.filter(b => b.genre.toLowerCase() === genre.toLowerCase());
    console.log(filteredBook);

    if (!filteredBook) {
      return res.status(404).json({ message: "Books not found of this genre" });
    }

    const start = (page - 1) * limit;
    const paginated = filteredBook.slice(start, start + +limit);
    res.json(paginated);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error })
  }
}


//API to get books by Id
export const getBookById = async (req, res) => {
  try {
    const { bookId } = req.params
    console.log(bookId);

    if (!bookId) return res.status(400).json({ message: "Please provide book id" });

    const books = await getBooks();
    if (!books) {
      return res.status(404).json({ message: "Books not found" })
    }

    const book = books.find(b => b.id === bookId);
    if (!book) return res.status(404).json({ message: 'Book not found by this Id' });

    res.json(book);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error })
  }
}


//API for add book
export const addBook = async (req, res) => {
  try {
    const { title, author, genre, publishedYear } = req.body;
    if (!title || !author || !genre || !publishedYear) {
      return res.staus(400).json({ message: "Please provide all details" })
    }

    const books = await getBooks();

    const newBook = { id: uuid(), title, author, genre, publishedYear, userId: req.user.id };

    books.push(newBook);
    await saveBooks(books);

    res.status(201).json(newBook);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error })
  }
}


//API for update book
export const updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    if (!bookId) {
      return res.status(400).json({ message: "Please provide book id" });
    }

    const books = await getBooks();
    if (!books) {
      return res.status(404).json({ message: "Books not found" })
    }

    const index = books.findIndex(b => b.id === bookId);

    if (index === -1) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (books[index].userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this book" });
    }

    // Fields allowed to update
    const allowedFields = ["title", "author", "genre", "publishedYear"];

    const updatedBook = { ...books[index] };

    for (const key of allowedFields) {
      if (req.body.hasOwnProperty(key)) {
        updatedBook[key] = req.body[key];
      }
    }

    books[index] = updatedBook;
    await saveBooks(books);

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//API for delete book
export const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params
    if (!bookId) return res.status(400).json({ message: "Please provide book id" });

    let books = await getBooks();
    const book = books.find(b => b.id === bookId);

    if (!book || book.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized or book not found' });
    }

    books = books.filter(b => b.id !== bookId);
    await saveBooks(books);

    res.json({ message: 'Book deleted' });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error })
  }
}