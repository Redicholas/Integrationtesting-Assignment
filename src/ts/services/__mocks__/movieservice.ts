import { IMovie } from "../../models/Movie";

let testMovies: IMovie[] = [
    {
        Title: "The Matrix",
        imdbID: "tt0133093",
        Type: "movie",
        Poster: "...",
        Year: "1999",
    },
    {
        Title: "The Matrix Reloaded",
        imdbID: "tt0234215",
        Type: "movie",
        Poster: "...",
        Year: "2003",
    },
    {
        Title: "The Matrix Revolutions",
        imdbID: "tt0242653",
        Type: "movie",
        Poster: "...",
        Year: "2003",
    },
];

export async function getData(): Promise<IMovie[]> {
    return new Promise((resolve, reject) => {
      if (testMovies.length > 0) {
        resolve(testMovies);
        } else {
        reject("Inga filmer hittades");
        }
    });
}
