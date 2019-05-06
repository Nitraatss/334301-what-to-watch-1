// Core
import React from "react";
import renderer from "react-test-renderer";

// Component
import {App} from "./app.jsx";

const props = {
  clickHandler: jest.fn(),
  filmsTitles: [
    `John Wick`,
    `Killers Bodyguard`,
    `Ocean's Eleven`,
    `Tomorrow Never Dies`
  ]
};

it(`App correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <App
          mistakes={0}
          minutes={0}
          onFilmTitleClick={props.clickHandler}
          filmsTitles={props.filmsTitles}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
