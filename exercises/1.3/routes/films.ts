import { Router } from "express";
import { Film, NewFilm } from "../types";

const films: Film[] = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    budget: 160000000,
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    imageUrl: "https://example.com/inception.jpg",
  },
  {
    id: 2,
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    duration: 136,
    budget: 63000000,
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    imageUrl: "https://example.com/matrix.jpg",
  },
  {
    id: 3,
    title: "Interstellar",
    director: "Christopher Nolan",
    duration: 169,
    budget: 165000000,
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    imageUrl: "https://example.com/interstellar.jpg",
  },
];

const router = Router();

router.get("/", (_req, res) => {
  if (!_req.query["minimum-duration"]) {
    return res.json(films);
  }
  const minimumDuration = Number(_req.query["minimum-duration"]);
  const filteredFilms = films.filter((films) => {
    return films.duration >= minimumDuration;
  });
  return res.json(filteredFilms);
});

router.post("/", (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    !body.title.trim() ||
    !body.director.trim() ||
    body.duration <= 0
  ) {
    return res.sendStatus(400);
  }
  const { title, director, duration, budget, description, imageUrl } =
    body as NewFilm;

  const nextId =
    films.reduce((maxId, films) => (films.id > maxId ? films.id : maxId), 0) +
    1;
  const newFilm: Film = {
    id: nextId,
    title,
    director,
    duration,
    budget,
    description,
    imageUrl,
  };

  films.push(newFilm);
  return res.json(newFilm);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((film) => film.id === id);
  if (!film) {
    return res.sendStatus(404);
  }
  return res.json(film);
});

export default router;
