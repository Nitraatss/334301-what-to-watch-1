// Core
import React from "react";
import renderer from "react-test-renderer";

// Component
import {App} from "./app.jsx";

const mocks = {
  films: [
    {
      id: 1,
      name: `John Wick`,
      genre: `Crime`,
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
    },
    {
      id: 2,
      name: `Killers Bodyguard`,
      genre: `Comedies`,
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
    },
    {
      id: 3,
      name: `Star Wars`,
      genre: `Sci-Fi`,
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
    },
    {
      id: 4,
      name: `The Grand Budapest Hotel`,
      genre: `Dramas`,
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
    },
    {
      id: 5,
      name: `The Cabin in the Woods`,
      genre: `Thrillers`,
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
    }
  ],
  genres: [
    `All genres`,
    `Comedies`,
    `Crime`,
    `Documentary`,
    `Dramas`,
    `Horror`,
    `Kids & Family`,
    `Romance`,
    `Sci-Fi`,
    `Thrillers`
  ],
  activeGenre: `All genres`,
  functionHandler: jest.fn()
};

describe(`App:`, () => {
  it(`Correctly renders after relaunch`, () => {
    const tree = renderer
      .create(
          <App
            films={mocks.films}
            genres={mocks.genres}
            activeGenre={mocks.activeGenre}
            onGenreClick={mocks.functionHandler}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
