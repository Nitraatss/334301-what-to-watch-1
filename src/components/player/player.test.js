// Core
import React from "react";
import renderer from "react-test-renderer";

// Component
import Player from "./player.jsx";

const mocks = {
  onPlayerToggle: jest.fn(),
  onFilmDurationUpdate: jest.fn(),
  activeFilm: {
    backgroundImage: `back`,
    description: `description`,
    director: `Director`,
    genre: `Action`,
    id: 1,
    isFavorite: false,
    name: `Title`,
    poster: `string`,
    posterImage: `string`,
    preview: `string`,
    rating: 5,
    released: 2018,
    runTime: 88,
    scoresCount: 2000,
    starring: [`1`, `2`, `3`],
    videoLink: `link`
  }
};

describe(`Player:`, () => {
  it(`Correctly renders after relaunch`, () => {
    const tree = renderer.create(<Player {...mocks} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
