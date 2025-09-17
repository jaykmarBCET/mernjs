# ⚡ MernJS Framework

**MernJS** is a lightweight framework-style boilerplate built on the **MERN stack**.  
It merges **Express + React (Vite)** seamlessly in a single runtime, without requiring separate builds or CORS setup.

---

## 📂 Project Structure

```

📦 mernjs-app
├── components/       # Reusable React components
│   ├── Card.jsx
│   ├── CardGrid.jsx
│   └── UserCard.jsx
│
├── config/           # Configuration files
│   └── db.js
│
├── controllers/      # Handler functions (Business logic)
│   └── user.controller.js
│
├── models/           # Database models (Mongoose)
│   └── User.js
│
├── roots/            # Root config (routes, middlewares)
│   └── roots.config.js
│
├── routes/           # API routes
│   └── user.route.js
│
├── views/            # Frontend (React + Vite)
│   ├── App.jsx
│   ├── Overview\.jsx
│   ├── main.jsx
│   ├── index.css
│   └── index.html
│
├── server.js         # Entry point (DO NOT MODIFY)
├── tailwind.config.js
├── vite.config.js
├── .env
└── DOCS.md           # Documentation

````

---

## 🚀 Features

- ✅ Express + React (Vite) running in **one server**
- ✅ **No CORS / No build step required**
- ✅ **MVC pattern** (Models, Controllers, Routes)
- ✅ **React frontend with TailwindCSS**
- ✅ **MongoDB with Mongoose**
- ✅ **Scalable structure for large apps**

---

## ⚙️ How it Works

- **server.js**  
  Starts Express + Vite in middleware mode.  
  Serves both API (`/api/...`) and React frontend (`/`).

- **roots/**  
  Registers all routers & middlewares.  

- **routes/**  
  Defines endpoints, e.g. `/api/user`.

- **controllers/**  
  Contains business logic (e.g. get user, create user).

- **models/**  
  Database schema and ORM (Mongoose).

- **views/**  
  React frontend, served directly by Vite middleware.

---

## 📌 Example: User Flow

### 1. Model (`models/User.js`)
```js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }
});

const User = mongoose.model("User", userSchema);
export default User;
````

### 2. Controller (`controllers/user.controller.js`)

```js
import User from "../models/User.js";

export const getUser = async (req, res) => {
  const user = await User.findOne() || { name: "Guest" };
  res.json(user);
};

export const createUser = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
};
```

### 3. Route (`routes/user.route.js`)

```js
import express from "express";
import { getUser, createUser } from "../controllers/user.controller.js";

const router = express.Router();
router.get("/", getUser);
router.post("/", createUser);
export default router;
```

### 4. Root Config (`roots/roots.config.js`)

```js
import express from "express";
import userRoutes from "../routes/user.route.js";

const app = express();
app.use(express.json());
app.use("/api/user", userRoutes);

export default app;
```

### 5. Server (`server.js`)

 - Do not modify 
 - If you need to configure middleware then you must add middleware in root/root.config.js

### 6. Frontend (`views/App.jsx`)

```jsx
import React, { useEffect, useState } from "react";

export default function App() {
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/api/user")
      .then(res => res.json())
      .then(data => setName(data.name));
  }, []);

  return (
    <div className="text-center p-6">
      <h1 className="text-4xl font-bold text-green-400">MernJS ⚡</h1>
      <p className="mt-4 text-lg">Hello, {name}!</p>
    </div>
  );
}
```

---

## 🛠️ Commands

### Install

```sh
npm install
```

### Start Dev (no build needed 🚀)

```sh
npm run dev or start
```

👉 Both **API** and **Frontend** run on `http://localhost:4000`

---

## 📦 Deployment

Unlike normal MERN apps, **MernJS does not require build**.

* Express runs backend APIs
* Vite serves frontend in middleware mode
* Just host `npm install` , `npm run dev` or run `npm run start` in production

---

## 🧩 Next Steps

* Add `auth.route.js` for authentication
* Add `docs.route.js` for framework docs page
* Extend `controllers/` with CRUD logic
* Use `react-router-dom` for multipage frontend

---

## ❤️ Credits

Built with **MongoDB, Express, React, Node.js**
Customized into a framework-style starter called **MernJS** ⚡

