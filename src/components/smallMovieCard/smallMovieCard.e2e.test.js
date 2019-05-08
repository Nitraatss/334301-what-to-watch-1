// Core
import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Component
import SmallMovieCard from "./smallMovieCard.jsx";

Enzyme.configure({adapter: new Adapter()});

const mocks = {
  id: `1`,
  title: `John Wick`,
  preview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  functionHandler: jest.fn()
};

it(`SmallMovieCard title link should react on click`, () => {
  const smallMovieCard = shallow(
      <SmallMovieCard
        id={mocks.id}
        title={mocks.title}
        preview={mocks.preview}
        _onFilmButtonClick={mocks.functionHandler}
        _changeActiveCard={mocks.functionHandler}
      />
  );

  const smallMovieCardTitleLink = smallMovieCard.find(`button`);
  smallMovieCardTitleLink.simulate(`click`, {preventDefault() {}});
  expect(mocks.functionHandler).toHaveBeenCalledTimes(1);
});
