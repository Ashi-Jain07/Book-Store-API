/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books with pagination
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       404:
 *         description: Books not found
 *         content:
 *           application/json:
 *             example:
 *               message: Books not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/books/search:
 *   get:
 *     summary: Get books filtered by genre (from query)
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: genre
 *         required: true
 *         description: Genre to filter books by
 *         schema:
 *           type: string
 *         example: Fiction
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 5
 *     responses:
 *       200:
 *         description: List of books matching the genre
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       400:
 *         description: Genre not provided
 *         content:
 *           application/json:
 *             example:
 *               message: Give genre for filter books
 *       404:
 *         description: No books found of this genre
 *         content:
 *           application/json:
 *             example:
 *               message: Books not found of this genre
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/books/{bookId}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         example: book-uuid-123
 *     responses:
 *       200:
 *         description: Book details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Book ID not provided
 *         content:
 *           application/json:
 *             example:
 *               message: Please provide book id
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             example:
 *               message: Book not found by this Id
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, author, genre, publishedYear]
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *             example:
 *               title: My Book
 *               author: Jane Doe
 *               genre: Fiction
 *               publishedYear: 2024
 *     responses:
 *       201:
 *         description: Book added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Missing required book fields
 *         content:
 *           application/json:
 *             example:
 *               message: Please provide all details
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/books/{bookId}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         example: book-uuid-123
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               title: Updated Title
 *               author: Updated Author
 *     responses:
 *       200:
 *         description: Book updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Book ID not provided
 *         content:
 *           application/json:
 *             example:
 *               message: Please provide book id
 *       403:
 *         description: Not authorized to update
 *         content:
 *           application/json:
 *             example:
 *               message: Not authorized to update this book
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             example:
 *               message: Book not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/books/{bookId}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         example: book-uuid-123
 *     responses:
 *       200:
 *         description: Book deleted
 *         content:
 *           application/json:
 *             example:
 *               message: Book deleted
 *       400:
 *         description: Book ID not provided
 *         content:
 *           application/json:
 *             example:
 *               message: Please provide book id
 *       403:
 *         description: Not authorized to delete
 *         content:
 *           application/json:
 *             example:
 *               message: Not authorized or book not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: abc123
 *         title:
 *           type: string
 *           example: The Alchemist
 *         author:
 *           type: string
 *           example: Paulo Coelho
 *         genre:
 *           type: string
 *           example: Fiction
 *         publishedYear:
 *           type: integer
 *           example: 1988
 *         userId:
 *           type: string
 *           example: user-uuid-456
 */
