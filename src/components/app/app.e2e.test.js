// Core
import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Component
import {App} from "./app.jsx";

Enzyme.configure({adapter: new Adapter()});

const props = {
  clickHandler: jest.fn(),
  filmsTitles: [
    `John Wick`,
    `Killers Bodyguard`,
    `Ocean's Eleven`,
    `Tomorrow Never Dies`
  ]
};

it(`App small movie card title link should react on click`, () => {
  const app = shallow(
      <App
        mistakes={0}
        minutes={0}
        onFilmTitleClick={props.clickHandler}
        filmsTitles={props.filmsTitles}
      />
  );

  const smallMovieCardTitleLink = app.find(`.small-movie-card__link`).last();
  smallMovieCardTitleLink.simulate(`click`, {preventDefault() {}});
  expect(props.clickHandler).toHaveBeenCalledTimes(1);
});
