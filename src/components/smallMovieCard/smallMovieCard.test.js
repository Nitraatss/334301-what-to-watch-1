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

describe(`SmallMovieCard:`, () => {
  it(`Correctly renders after relaunch`, () => {
    const tree = renderer
      .create(
          <SmallMovieCard
            id={mocks.id}
            title={mocks.title}
            preview={mocks.preview}
            onButtonClick={mocks.functionHandler}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
