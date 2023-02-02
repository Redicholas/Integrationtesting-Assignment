import { movieSort } from "../functions";
import { IMovie } from "../models/Movie";

describe("tests for movieSort()", () => {
    
    test("should sort movies by name", () => {
        // Arrange
        const movies: IMovie[] = [
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
            {
                Title: "The Matrix",
                imdbID: "tt0133093",
                Type: "movie",
                Poster: "...",
                Year: "1999",
            },
        ];
    
        // Act
        const result = movieSort(movies, true);
    
        // Assert
        expect(result[0].Title).toBe("The Matrix");
        expect(result[1].Title).toBe("The Matrix Reloaded");
        expect(result[2].Title).toBe("The Matrix Revolutions");
    });
    
    test("should sort by name descending", () => {
        // Arrange
        const movies: IMovie[] = [
            {
                Title: "The Matrix Reloaded",
                imdbID: "tt0234215",
                Type: "movie",
                Poster: "...",
                Year: "2003",
            },
            {
                Title: "The Matrix",
                imdbID: "tt0133093",
                Type: "movie",
                Poster: "...",
                Year: "1999",
            },
            {
                Title: "The Matrix Revolutions",
                imdbID: "tt0242653",
                Type: "movie",
                Poster: "...",
                Year: "2003",
            },
        ];
    
        // Act
        const result = movieSort(movies, false);
    
        // Assert
        expect(result[0].Title).toBe("The Matrix Revolutions");
        expect(result[1].Title).toBe("The Matrix Reloaded");
        expect(result[2].Title).toBe("The Matrix");
    });

    test("should keep the order if same name, descending", () => {
        // Arrange
        const movies: IMovie[] = [
            {
                Title: "The Matrix",
                imdbID: "tt0133093",
                Type: "movie",
                Poster: "First",
                Year: "1999",
            },
            {
                Title: "The Matrix",
                imdbID: "tt0133093",
                Type: "movie",
                Poster: "Second",
                Year: "1999",
            },
        ];

        // Act
        const result = movieSort(movies, true);

        // Assert
        expect(result[0].Poster).toBe("First");
        expect(result[1].Poster).toBe("Second");
    })

    test("should keep the order if same name, ascending", () => {
        // Arrange
        const movies: IMovie[] = [
            {
                Title: "The Matrix",
                imdbID: "tt0133093",
                Type: "movie",
                Poster: "First",
                Year: "1999",
            },
            {
                Title: "The Matrix",
                imdbID: "tt0133093",
                Type: "movie",
                Poster: "Second",
                Year: "1999",
            },

        ];

        // Act
        const result = movieSort(movies, false);

        // Assert
        expect(result[0].Poster).toBe("First");
        expect(result[1].Poster).toBe("Second");
    })
})
