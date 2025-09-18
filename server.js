import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import Root from "./roots/roots.config.js";
import fs from 'node:fs'
import chalk from "chalk";

dotenv.config();

// don't change here
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use("/api", Root);

  if (process.env.MODE === "production") {

    const distPath = path.join(__dirname, "dist");


    app.use(express.static(distPath));


    app.get("/", async (req, res) => {

      try {
         fs.access(distPath); // checks if folder exists & is accessible
      } catch (err) {
        console.log("Run `npm run build` first!");
        throw new Error("Please build first");
      }
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      root: path.join(__dirname, "views"),
    });

    app.use(vite.middlewares);
  }

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
}

startServer();
