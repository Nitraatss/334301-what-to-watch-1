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
  changeGenre: jest.fn(),
  setActiveFilm: jest.fn(),
  history: {
    push: jest.fn()
  }
};

describe(`SmallMovieCard:`, () => {
  it(`Should run callback changeGenre and setActiveFilm on component click`, () => {
    const smallMovieCard = mount(<SmallMovieCard {...mocks} />);

    smallMovieCard.simulate(`click`, {preventDefault() {}});
    expect(mocks.changeGenre).toHaveBeenCalledTimes(1);
    expect(mocks.setActiveFilm).toHaveBeenCalledTimes(1);
  });
});
