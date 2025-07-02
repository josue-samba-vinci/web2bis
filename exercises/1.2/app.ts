import express from "express";

// Importing routers
import filmsRouter from "./routes/films";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mounting the films router
// This will handle requests to /films
app.use("/films", filmsRouter);

export default app;
