// import { getData } from "../services/movieservice";
import { IMovie } from "../models/Movie";

const movies: IMovie[] = [
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

jest.mock("axios", () => ({
    get: async (url: string) => {
        return new Promise((resolve, reject) => {
            if (url.endsWith("error")) {
                reject([]);
            }
            else {
                resolve (movies);
            }
        });
    }
}));

// test("should get data correctly", async () => {
//     const data = await getData("test")
// });

// test("should get error getting data", async () => {
//     try {
//         const data = await getData("error")
//     } catch (error: any) {
//         expect(error.length).toBe(0);
//     }
// });