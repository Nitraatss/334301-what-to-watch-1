// Core
import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Component
import GenresList from "./genresList.jsx";

Enzyme.configure({adapter: new Adapter()});

const mocks = {
  genre: `All genres`,
  anotherGenre: `Some genre`,
  functionHandler: jest.fn()
};

describe(`GenresList:`, () => {
  it(`Genre should run callback on mouse click`, () => {
    const genresList = mount(
        <GenresList
          activeItem={mocks.genre}
          onGenreClick={mocks.functionHandler}
        />
    );

    const singleGenre = genresList.find(`a`).last();
    singleGenre.simulate(`click`, {preventDefault() {}});
    expect(mocks.functionHandler).toHaveBeenCalledTimes(1);
  });

  it(`Should change activeItem state on clicked genre`, () => {
    const genresList = mount(
        <GenresList
          activeItem={mocks.genre}
          onGenreClick={mocks.functionHandler}
        />
    );

    const singleGenre = genresList.find(`a`).last();
    singleGenre.simulate(`click`, {preventDefault() {}});
    expect(genresList.state(`activeItem`)).toEqual(`Thrillers`);
  });
});
