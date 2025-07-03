 # 📚 Bookstore REST API  <br/>
A simple Node.js + Express-based Bookstore REST API that allows users to register, login, and perform CRUD operations on books. The app uses file-based data storage (users.json, books.json) and protects book routes using JWT authentication.

## 🚀 Features
🔐 User Registration & Login (JWT-based)

📘 CRUD operations on books (Create, Read, Update, Delete)

🔎 Filter books by genre

📄 File-based persistence

🛡️ Protected routes for book operations

🧪 API testing via Postman

📑 Swagger API Documentation at http://localhost:5000/api-docs

## 📦 Project Structure

├── controllers/ <br/>
│   ├── authController.js <br/>
│   └── bookController.js <br/>
├── data/ <br/>
│   ├── books.json <br/>
│   └── users.json <br/>
├── docs/ <br/>
│   ├── auth.swagger.js <br/>
│   └── books.swagger.js <br/>
├── middleware/ <br/>
│   └── middleware.js <br/>
├── model/ <br/>
│   ├── bookModel.js <br/>
│   └── userModel.js <br/>
├── routes/ <br/>
│   ├── authRoutes.js <br/>
│   └── bookRoutes.js <br/>
├── swagger.js <br/>
├── server.js <br/>
└── README.md <br/>

## 🛠️ Setup Instructions

1. Clone the repository <br/>
git clone https://github.com/Ashi-Jain07/Book-Store-API.git <br/>
cd Book-Store-API <br/>

2. Install dependencies <br/>
npm install

3. Start the server <br/>
npm start <br/>
Server runs on http://localhost:5000

## 🔐 Authentication
This project uses JWT. All /api/books routes are protected.

Get a token via POST /api/auth/login

Use the token in the Authorization header as:
Authorization: Bearer <your_token>

## 📮 API Endpoints

🔑 Auth Routes <br/>
POST	/api/auth/register - Register a new user <br/>
POST	/api/auth/login	Login - and get JWT token

📚 Book Routes (Protected) <br/>
GET	/api/books - Get all books (paginated) <br/>
GET	/api/books/search	- Filter books by genre <br/>
GET	/api/books/:bookId	- Get a book by ID <br/>
POST	/api/books	- Add a new book <br/>
PUT	/api/books/:bookId	- Update an existing book <br/>
DELETE	/api/books/:bookId	- Delete a book

## 🧪 Testing with Postman

### 🔑 1. Register a New User
Method: POST  
URL: http://localhost:5000/api/auth/register

Body (JSON): <br/> 
{ <br/>
  "email": "user@example.com",  
  "password": "123456"  
}

### 🔑 2. Login
Method: POST  
URL: http://localhost:5000/api/auth/login

Body (JSON): <br/> 
{ <br/>
  "email": "user@example.com",  
  "password": "123456"  
} <br/>

Response: <br/>
{ <br/>
  "token": "eyJhbGciOiJIUzI1NiIsInR5..." <br/>
} <br/>
Copy this token for the next steps. Use it in all book-related requests. <br/>

In Headers of each protected request: <br/>
Key: Authorization <br/>
Value: Bearer <your_token> <br/>

### 📘 3. Get All Books (Paginated)
Method: GET <br/>
URL: http://localhost:5000/api/books?page=1&limit=5 <br/>

### 🔍 4. Filter Books by Genre
Method: GET <br/>
URL: http://localhost:5000/api/books/search?genre=Fiction&page=1&limit=5 <br/>

### 📖 5. Get a Book by ID
Method: GET <br/>
URL: http://localhost:5000/api/books/<bookId> <br/>

Replace <bookId> with the actual ID returned from a previous API call.

### ➕ 6. Add a New Book
Method: POST <br/>
URL: http://localhost:5000/api/books <br/>

Body (JSON): <br/>
{ <br/>
  "title": "The Alchemist", <br/>
  "author": "Paulo Coelho", <br/>
  "genre": "Fiction", <br/>
  "publishedYear": 1988 <br/>
}

### ✏️ 7. Update a Book
Method: PUT <br/>
URL: http://localhost:5000/api/books/<bookId> <br/>

Body (JSON): <br/>
{ <br/>
  "title": "The Alchemist (Updated)", <br/>
  "publishedYear": 1993 <br/>
} <br/>
Only include fields you want to update.

### ❌ 8. Delete a Book
Method: DELETE <br/>
URL: http://localhost:5000/api/books/<bookId>

## 📘 Swagger API Documentation
API documentation is available at: <br/>
📄 http://localhost:5000/api-docs

## 📌 Notes
This API uses file-based storage (books.json, users.json). No database is used. <br/>
JWT tokens expire after 1 hour. <br/>
You must provide the token in every request to /api/books/*.
