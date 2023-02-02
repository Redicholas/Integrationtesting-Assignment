/**
* @jest-environment jsdom 
*/

import * as movieApp from '../movieApp';
import * as movieservice from '../services/movieservice';
import { IMovie } from '../models/Movie';

jest.mock("../services/movieservice");

beforeEach(() => {
    document.body.innerHTML = "";
});

describe("tests for init()", () => {

    test("should call handleSubmit() when form is submitted", () => {

        // Arrange
        document.body.innerHTML = `
            <form id="searchForm">
                <input type="text" id="searchText" placeholder="Skriv titel här" />
                <div id="movie-container"></div>
            </form>
        `;
        const form = document.getElementById("searchForm") as HTMLFormElement;
        const handleSubmitSpy = jest.spyOn(movieApp, "handleSubmit")
        .mockReturnValue(new Promise<void>((resolve) => {
            resolve();
        }));
    
        // Act
        movieApp.init();
        
        // form.dispatchEvent(new Event('submit'));
        form.submit();
    
        // Assert
        expect(handleSubmitSpy).toHaveBeenCalled();
    
        handleSubmitSpy.mockRestore();
    
    });
});

describe("tests for handleSubmit()", () => {

    test("should call getData() correctly", async () => {
        // Arrange
        document.body.innerHTML = `
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <div id="movie-container"></div>
        `;
        const searchText = document.getElementById("searchText") as HTMLInputElement;
        searchText.value = "The Matrix";
        const getDataSpy = jest.spyOn(movieservice, "getData").mockReturnValue(Promise.resolve([]));

        // Act
        await movieApp.handleSubmit();

        // Assert
        expect(getDataSpy).toBeCalledWith("The Matrix");
        getDataSpy.mockRestore();

    });

    test("should call createHtml() if there are movies", async () => {
        // Arrange
        document.body.innerHTML = `
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <div id="movie-container"></div>
        `;
        const searchText = document.getElementById("searchText") as HTMLInputElement;
        searchText.value = "The Matrix";
        const createHtmlMock = jest.spyOn(movieApp, "createHtml");
        const movies: IMovie[] = [
            {
                Title: "The Matrix",
                imdbID: "tt0133093",
                Type: "movie",
                Poster: "...",
                Year: "1999",
            },
        ];
        const getDataMock = jest.spyOn(movieservice, "getData").mockReturnValue(Promise.resolve(movies));

        
        // Act
        await movieApp.handleSubmit();

        // Assert
        expect(getDataMock).toBeCalledTimes(1);
        expect(createHtmlMock).toBeCalledTimes(1);

        getDataMock.mockRestore();
        createHtmlMock.mockRestore();
    });

    test("should call displayNoResult if there are no movies", async () => {
        // Arrange
        document.body.innerHTML = `
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <div id="movie-container"></div>
        `;
        const searchText = document.getElementById("searchText") as HTMLInputElement;
        searchText.value = "";

        const getDataMock = jest.spyOn(movieservice, "getData").mockReturnValue(Promise.reject());
        const displayNoResultMock = jest.spyOn(movieApp, "displayNoResult");

        // Act
        await movieApp.handleSubmit();

        // Assert
        expect(getDataMock).toBeCalledTimes(1);
        expect(displayNoResultMock).toBeCalledTimes(1);

        getDataMock.mockRestore();
        displayNoResultMock.mockRestore();
    });
});

describe("tests for createHtml", () => {

    test("should create html correctly", () => {
        // Arrange
        const movies: IMovie[] = [
            {
                Title: "The Matrix",
                Year: "1999",
                imdbID: "tt0133093",
                Type: "movie",
                Poster: "...",
            },
        ];

        document.body.innerHTML = `<div id="movie-container"></div>`;
        const container = document.getElementById("movie-container") as HTMLDivElement;

        // Act
        movieApp.createHtml(movies, container);

        // Assert
        expect(container.innerHTML).toContain("The Matrix");
    });
})

describe("tests for displayNoResult", () => {

    test("should display message", () => {
        // Arrange
        document.body.innerHTML = `<div id="movie-container"></div>`;
        const container = document.getElementById("movie-container") as HTMLDivElement;

        // Act
        movieApp.displayNoResult(container);

        // Assert
        expect(container.innerHTML).toContain("Inga sökresultat att visa");
    })
});
