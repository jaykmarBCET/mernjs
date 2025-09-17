import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv'
import Root from './roots/roots.config.js'
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use("/api", Root)
  
  const vite = await createViteServer({
    server: { middlewareMode: "html" },
    root: path.join(__dirname, "views"),
  });

  app.use(vite.middlewares);


  app.listen(4000, () => console.log("🚀 Server running at http://localhost:3000"));
}

startServer();
