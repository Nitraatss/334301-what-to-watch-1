// Core
import React from "react";
import renderer from "react-test-renderer";

// Component
import GenresList from "./genres-list.jsx";

const mocks = {
  genres: [`All genres`, `Action`, `Drama`, `Comedy`],
  activeItem: `active`,
  changeActiveItem: jest.fn()
};

describe(`GenresList:`, () => {
  it(`Correctly renders after relaunch`, () => {
    const tree = renderer.create(<GenresList {...mocks} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
