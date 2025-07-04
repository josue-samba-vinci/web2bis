import express from "express";

// Importing routers
import filmsRouter from "./routes/films";

const app = express();

// Middleware to log the number of requests
/*let requestCounter = 0;
app.use((req, _res, next) => {
  if (req.method === "GET") {
    requestCounter++;
    console.log(`GET counter : ${requestCounter}`);
  }
  next();
});
*/

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mounting the films router
// This will handle requests to /films
app.use("/films", filmsRouter);

export default app;
