// Core
import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";

// Component
import MovieNavigation from "./movie-navigation.jsx";

const mocks = {
  history: {
    push: jest.fn()
  },
  history: {
    url: `url`
  }
};

describe(`MovieNavigation:`, () => {
  it(`Correctly renders after relaunch`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <MovieNavigation {...mocks} />
          </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
