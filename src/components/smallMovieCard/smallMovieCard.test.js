// Core
import React from "react";
import renderer from "react-test-renderer";

// Component
import SmallMovieCard from "./smallMovieCard.jsx";

const mocks = {
  id: `1`,
  title: `John Wick`,
  preview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  functionHandler: jest.fn()
};

it(`SmallMovieCard correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <SmallMovieCard
          id={mocks.id}
          title={mocks.title}
          preview={mocks.preview}
          _changeActiveCard={mocks.functionHandler}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
