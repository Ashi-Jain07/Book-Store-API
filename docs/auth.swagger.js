/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: user@example.com
 *               password: 123456
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User registered
 *               user:
 *                 id: 5f4dcc3b5aa765d61d8327deb882cf99
 *                 email: user@example.com
 *       400:
 *         description: Bad request (Missing fields or user already exists)
 *         content:
 *           application/json:
 *             examples:
 *               MissingFields:
 *                 summary: Missing email or password
 *                 value:
 *                   message: Enter email and pasword
 *               UserExists:
 *                 summary: User already exists
 *                 value:
 *                   message: User already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *               error: Something went wrong
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login and get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: user@example.com
 *               password: 123456
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Bad request (Missing email or password)
 *         content:
 *           application/json:
 *             example:
 *               message: Enter email and pasword
 *       401:
 *         description: Unauthorized (Invalid credentials)
 *         content:
 *           application/json:
 *             examples:
 *               InvalidEmail:
 *                 summary: Email not found
 *                 value:
 *                   message: Invalid Email
 *               InvalidPassword:
 *                 summary: Password mismatch
 *                 value:
 *                   message: Invalid Password
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *               error: Something went wrong
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: abc123
 *         email:
 *           type: string
 *           example: user@gmail.com
 *         password:
 *           type: string
 *           example: 12345
 */