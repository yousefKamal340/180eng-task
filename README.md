# 📝 MERN To-Do App with Authentication & Material UI

A full-stack To-Do application built using the **MERN stack**: MongoDB, Express, React, and Node.js.  
This app allows users to **register**, **login**, and manage personal to-do tasks in a clean, modern, and responsive interface using **Material UI (MUI v5)**.

---

## 📦 Tech Stack

### Frontend:

- ⚛️ React.js (with Hooks & Router)
- 🎨 Material UI (MUI v5)
- 🔗 Axios for HTTP requests

### Backend:

- 🛠️ Node.js with Express
- 🗄️ MongoDB with Mongoose
- 🔒 JWT (JSON Web Tokens) for authentication
- 🔐 bcryptjs for password hashing

### Other Tools:

- 📄 dotenv for environment variables
- 🔃 cors for cross-origin requests

---

## 🚀 Features

- 🔐 **JWT Authentication**: Secure login and registration
- 📝 **CRUD Todos**: Add, delete, toggle, and filter tasks
- 🔍 **Search & Filter**: Search todos by title and filter by status
- 📅 **Due Date**: Set deadlines for tasks
- 📱 **Responsive UI**: Built with Material UI and mobile-friendly
- 🧭 **Protected Routes**: Unauthorized users are redirected to login

---

## 🛠️ Setup Instructions

### 1. 📁 Clone the Repository

git clone https://github.com/yourusername/mern-todo-app.git
cd mern-todo-app

2. ⚙️ Backend Setup

cd backend
npm install

Create a .env file inside the backend directory with the following:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000

Start the backend server:
npm start
The backend will run at: http://localhost:5000

---

3. 💻 Frontend Setup

cd ../frontend
npm install
npm start

The frontend will run at: http://localhost:3000

✅ Upon launch, users will be redirected to the login page. After logging in, they will be taken to the To-Do Dashboard.

---

🔍 Key Functionalities Explained
🧑‍💼 Authentication
User passwords are hashed using bcryptjs before storage.

JWT tokens are generated on login and stored in localStorage.

The token is sent in the Authorization header for protected API requests.

📋 Todo Management
Todos contain title, description, dueDate, and status.

Users can:

Create new todos

Toggle status between pending and completed

Delete a todo

Search by title

Filter by status

🎨 Material UI Styling
Responsive layout using Grid, Card, and Stack

Consistent look and feel across devices

Styled buttons, form inputs, and toolbars

---

🧪 Example .env

# backend/.env

MONGO_URI=mongodb://localhost:27017/tododb
JWT_SECRET=myverysecretjwt
PORT=5000

---

🔮 Future Enhancements
✅ Toast notifications for actions using react-toastify

✏️ Edit todos inline or in a modal

🌙 Dark mode toggle

🌍 Deployment:

Frontend: Vercel / Netlify

Backend: Render / Railway / Heroku

📱 PWA support for offline access

---

🙌 Acknowledgments

Material UI (https://mui.com/)

MongoDB (https://www.mongodb.com/)

JWT.io (https://jwt.io/)