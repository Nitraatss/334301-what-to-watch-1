// Core
import React from "react";
import renderer from "react-test-renderer";

// Component
import GenresList from "./genresList.jsx";

const mocks = {
  genre: `All genres`,
  functionHandler: jest.fn()
};

describe(`GenresList:`, () => {
  it(`Correctly renders after relaunch`, () => {
    const tree = renderer
      .create(
          <GenresList
            activeItem={mocks.genre}
            onGenreClick={mocks.functionHandler}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
