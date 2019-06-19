// Core
import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Component
import {SmallMovieCard} from "./small-movie-card.jsx";

Enzyme.configure({adapter: new Adapter()});

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
  it(`Should run callback onGenreChange and onActiveFilmSet on component click`, () => {
    const smallMovieCard = mount(<SmallMovieCard {...mocks} />);

    smallMovieCard.simulate(`click`, {preventDefault() {}});
    expect(mocks.onGenreChange).toHaveBeenCalledTimes(1);
    expect(mocks.onActiveFilmSet).toHaveBeenCalledTimes(1);
  });
});
