// Core
import React from "react";
import renderer from "react-test-renderer";

// Component
import {SmallMovieCard} from "./small-movie-card.jsx";

const mocks = {
  id: 1,
  title: `title`,
  poster: `poster`,
  preview: `prev`,
  genre: `Action`,
  onGenreChange: jest.fn(),
  onActiveFilmSet: jest.fn(),
  history: {
    push: jest.fn()
  }
};

describe(`SmallMovieCard:`, () => {
  it(`Correctly renders after relaunch`, () => {
    const tree = renderer.create(<SmallMovieCard {...mocks} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
