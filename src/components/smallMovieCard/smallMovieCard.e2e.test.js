// Core
import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Component
import SmallMovieCard from "./smallMovieCard.jsx";

Enzyme.configure({adapter: new Adapter()});

const mockedFilm = {
  id: `1`,
  title: `John Wick`,
  preview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
};

const mocks = Object.assign(mockedFilm, {
  onClickHandler: jest.fn(() => mockedFilm.id)
});

describe(`SmallMovieCard:`, () => {
  it(`Button should run callback on click`, () => {
    const smallMovieCard = shallow(
        <SmallMovieCard
          id={mocks.id}
          title={mocks.title}
          preview={mocks.preview}
          onButtonClick={mocks.onClickHandler}
        />
    );

    const smallMovieCardTitleLink = smallMovieCard.find(`button`);
    smallMovieCardTitleLink.simulate(`click`, {preventDefault() {}});
    expect(mocks.onClickHandler).toHaveBeenCalledTimes(1);
  });

  it(`Button should return film index on click`, () => {
    const smallMovieCard = shallow(
        <SmallMovieCard
          id={mocks.id}
          title={mocks.title}
          preview={mocks.preview}
          onButtonClick={mocks.onClickHandler}
        />
    );

    const smallMovieCardTitleLink = smallMovieCard.find(`button`);
    smallMovieCardTitleLink.simulate(`click`, {preventDefault() {}});
    expect(mocks.onClickHandler).toHaveReturnedWith(mocks.id);
  });
});
