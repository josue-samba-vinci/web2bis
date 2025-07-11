import path from "node:path";   
import {Film, NewFilm} from "../types";
import {parse, serialize} from "../utils/json";
const jsonDbPath = path.join(__dirname,"/../data/films.json");

const defaultFilms: Film[] = [
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
  },
  {
    id: 4,
    title: "Past Lives",
    director: "Celine Song",
    duration: 105,
    budget: 11000000,
    description: "Two childhood friends reunite after decades apart, exploring the complexities of love and destiny.",
    imageUrl: "https://example.com/pastlives.jpg"
  },
];

const readAll= (minimumDuration: number|undefined = undefined): Film[]=>{
    const films = parse(jsonDbPath, defaultFilms);
    return minimumDuration ? 
        films.filter(film => film.duration >= minimumDuration) : 
        films;
    };

const readOne = (id: number): Film | undefined => {
    const films = parse(jsonDbPath, defaultFilms);
    return films.find(film => film.id === id);
};

const createOne = (newFilm: NewFilm): Film | undefined => {
    const films = parse(jsonDbPath, defaultFilms);

    const existingFilm = films.find((film) =>
        film.title.toLowerCase() === newFilm.title.toLowerCase()&&
        film.director.toLowerCase() === newFilm.director.toLowerCase()
    );


    if (existingFilm) {
        return undefined; // Film already exists
    }

    const film = { id:nextId(),...newFilm };
    films.push(film);
    serialize(jsonDbPath, films);
    return film;
};

const deleteOne = (id: number): Film | undefined => {
  const films = parse(jsonDbPath, defaultFilms);

  const index = films.findIndex((film) => film.id === id);

  if (index === -1) {
    return undefined;
  }

  const [film] = films.splice(index, 1);
  serialize(jsonDbPath, films);

  return film;
};

const updateOne = (
  id: number,
  updatedFilm: Partial<NewFilm>
): Film | undefined => {
  const films = parse(jsonDbPath, defaultFilms);

  const index = films.findIndex((film) => film.id === id);

  if (index === -1) {
    return undefined;
  }

  const film = { ...films[index], ...updatedFilm };

  films[index] = film;
  serialize(jsonDbPath, films);

  return film;
};

const updateOrCreateOne = (
  id: number,
  updatedFilm: NewFilm
): Film | undefined => {
  const films = parse(jsonDbPath, defaultFilms);

  const index = films.findIndex((film) => film.id === id);

  if (index === -1) {
    return createOne(updatedFilm);
  }

  const film = { ...films[index], ...updatedFilm };

  films[index] = film;
  serialize(jsonDbPath, films);

  return film;
};

const nextId = () =>
  parse(jsonDbPath, defaultFilms).reduce(
    (maxId, film) => Math.max(maxId, film.id),
    0
  ) + 1;

export { readAll, readOne, createOne, deleteOne, updateOne, updateOrCreateOne };
