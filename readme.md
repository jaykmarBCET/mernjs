
-----

# ⚡ MernJS Framework

**MernJS** is a lightweight, full-stack boilerplate built on the **MERN stack**. It is designed for rapid development by seamlessly integrating an **Express.js** backend and a **React (Vite)** frontend into a single, unified server runtime. This unique architecture eliminates the need for separate builds or complex CORS configurations.

-----

## Key Features

  * **Unified Runtime**: A single `node` process serves both the backend API and the React frontend, simplifying development and deployment.
  * **Modern Authentication**: Secure, token-based authentication using **JSON Web Tokens (JWT)** with middleware-protected routes.
  * **High-Performance Caching**: A built-in, Redis-style in-memory cache for user data reduces database lookups and accelerates API responses.
  * **Efficient State Management**: Centralized frontend state management powered by **Zustand**, offering a simple and scalable solution.
  * **Streamlined Tooling**: Built with modern tools including **Vite** for a fast frontend development experience and **TailwindCSS** for utility-first styling.
  * **Developer-Friendly**: A single `package.json` manages all dependencies, and a unified development command (`npm run dev`) provides hot-reloading for both the server and the client.

-----

## Getting Started

Follow these steps to get your development environment up and running.

### 1\. Prerequisites

  * [Node.js](https://nodejs.org/) (v18.x or later)
  * [MongoDB](https://www.mongodb.com/) (local or cloud instance)

### 2\. Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone  https://github.com/jaykmarBCET/mernjs.git
    cd mernjs-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory by copying the example file:

    ```bash
    cp .env.example .env
    ```

    Update the `.env` file with your specific configuration:

    ```env
    # MongoDB Connection URI
    DATABASE_URL=mongodb://127.0.0.1:27017/myDatabase

    # The public URL for the Vite frontend to communicate with the API
    VITE_PUBLIC_API_URL=http://localhost:4000

    # JWT Configuration
    JWT_SECRET=your_super_secret_jwt_key
    JWT_EXPIRES_IN=7d
    ```

### 3\. Running the Application

  * **Development Mode:**
    Run the server with hot-reloading for both backend and frontend.

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:4000`.

  * **Production Mode:**
    Build the optimized frontend assets and start the production server.

    ```bash
    # Create an optimized production build
    npm run build

    # Start the server
    npm start
    ```

-----

## Project Structure

The project is organized into a modular structure to maintain a clean and scalable codebase.

```
📦 mernjs-app/
├── cache/              # In-memory caching layer (e.g., user sessions)
├── config/             # Database connection and environment configuration
├── controllers/        # Business logic for handling API requests
├── middleware/         # Custom middleware (e.g., JWT authentication)
├── models/             # Mongoose schemas and models for MongoDB
├── routes/             # API route definitions
├── roots/              # Centralized configuration for mounting all routes
├── views/              # The React (Vite) frontend application
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components (e.g., Login, Register)
│   ├── store/          # Zustand store for global state management
│   ├── App.jsx         # Root React component
│   └── main.jsx        # Frontend application entry point
│
├── server.js           # Main application entry point
├── tailwind.config.js  # TailwindCSS configuration
├── vite.config.js      # Vite configuration
└── .env                # Environment variables (not version controlled)
```

-----

## Authentication System

The framework includes a complete authentication flow using JWT.

1.  A user registers (`/api/user/profile/register`) or logs in (`/api/user/profile/login`).
2.  Upon successful login, the server generates a JWT and sends it to the client.
3.  The frontend stores the token (e.g., in an HTTP-only cookie or local storage) and uses it in the `Authorization` header for subsequent requests.
4.  The `authMiddleware` intercepts requests to protected routes, verifies the token, and retrieves the user's data from the cache or database.
5.  On the frontend, the **Zustand** store manages the user's authentication state across the application.

### API Endpoints

| Method | Endpoint             | Description                         | Protected |
| :----- | :------------------- | :---------------------------------- | :-------: |
| `POST` | `/api/user/profile/register` | Register a new user.                |    No     |
| `POST` | `/api/user/profile/login`    | Authenticate a user and return JWT. |    No     |
| `GET`  | `/api/user/profile`  | Get the current user's profile.     |    Yes    |
| `PUT`  | `/api/user//profile/update`  | Update the current user's profile.  |    Yes    |

-----

## Deployment

The unified build process simplifies deployment. The `npm run build` command compiles the React frontend into a static `dist` directory, which is then served by the Express application. To deploy, simply install dependencies and start the server.

```bash
npm install --production
npm start
```

This single command is all that is needed to run the entire full-stack application on a server.

-----

## Roadmap & Contributing

We welcome contributions to enhance the MernJS framework. Pull requests and issues are highly encouraged.

### Future Enhancements

  * [ ] Add toast notifications for user feedback.
  * [ ] Implement a robust logout and session expiration flow.
  * [ ] Introduce role-based access control (RBAC) for routes.
  * [ ] Integrate OAuth providers (e.g., Google, GitHub).

-----

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.