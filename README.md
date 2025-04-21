# 📝 MERN To-Do App with Authentication & Material UI

A full-stack To-Do application built with the **MERN stack** (MongoDB, Express, React, Node.js), featuring user authentication (JWT) and a clean, responsive UI with **Material UI**.

---

## 📦 Tech Stack

- **Frontend**: React.js, React Router, Axios, Material UI (MUI v5)
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, bcryptjs
- **Other**: dotenv, cors

---

## 🚀 Features

- 🔐 User Registration & Login (JWT-based authentication)
- 📝 Create, update, delete, and toggle todos
- 🔍 Filter todos by status and search by title
- 💅 Responsive UI with Material UI components

---

## 🛠️ Setup Instructions

### 1. 📁 Clone the Repo

git clone https://github.com/yourusername/mern-todo-app.git
cd mern-todo-app 2. ⚙️ Backend Setup
cd backend
npm install
Create a .env file in backend/:

env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Start the backend server:

npm start 3. 💻 Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
npm start
Your app will be running at http://localhost:3000

🔍 Code Highlights
Authentication: JWT-based, stored in localStorage, sent via headers

CRUD operations via protected endpoints

Filter by status, search by title

UI: Built entirely with MUI Grid, Cards, Buttons, Forms

🔮 Future Enhancements
Toast notifications (success/error)

Edit todos inline

Dark mode toggle

Deploy to Vercel + Render
