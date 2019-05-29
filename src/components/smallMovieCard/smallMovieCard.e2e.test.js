// Core
import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Component
import SmallMovieCard from "./smallMovieCard.jsx";

Enzyme.configure({adapter: new Adapter()});

const mockedFilm = {
  id: 1,
  title: `John Wick`,
  poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
};

const mocks = Object.assign(mockedFilm, {
  mouseHandler: jest.fn()
});

describe(`SmallMovieCard:`, () => {
  it(`Card should run callback on mouse enter`, () => {
    const smallMovieCard = mount(
        <SmallMovieCard
          id={mocks.id}
          title={mocks.title}
          poster={mocks.poster}
          preview={mocks.preview}
          onSmallCardEnter={mocks.mouseHandler}
        />
    );

    smallMovieCard.simulate(`mouseenter`);
    expect(mocks.mouseHandler).toHaveBeenCalledTimes(1);
  });

  it(`Card should return film index on mouse enter`, () => {
    const smallMovieCard = mount(
        <SmallMovieCard
          id={mocks.id}
          title={mocks.title}
          poster={mocks.poster}
          preview={mocks.preview}
          onSmallCardEnter={mocks.mouseHandler}
        />
    );

    smallMovieCard.simulate(`mouseleave`);
    expect(mocks.mouseHandler).toHaveBeenCalledWith(mocks.id);
  });
});
