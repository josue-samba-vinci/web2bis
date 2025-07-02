import { Router } from "express";
import { Film } from "../types";

const films: Film[] = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    budget: 160000000,
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    imageUrl: "https://example.com/inception.jpg"
  },
  {
    id: 2,
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    duration: 136,
    budget: 63000000,
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    imageUrl: "https://example.com/matrix.jpg"
  },
    {
        id: 3,
        title: "Interstellar",
        director: "Christopher Nolan",
        duration: 169,
        budget: 165000000,
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        imageUrl: "https://example.com/interstellar.jpg"
    }
];

const router = Router();

router.get("/", (_req, res) => {
  return res.json(films);
});

export default router;
