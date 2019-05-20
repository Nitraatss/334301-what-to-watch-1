// Core
import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Component
import GenresList from "./genresList.jsx";

Enzyme.configure({adapter: new Adapter()});

const mocks = {
  genre: `All genres`,
  functionHandler: jest.fn()
};

describe(`GenresList:`, () => {
  it(`Genre should run callback on mouse click`, () => {
    const genresList = shallow(
        <GenresList
          activeGenre={mocks.genre}
          onGenreClick={mocks.functionHandler}
        />
    );

    singleGenre = moviesList.find(`a`).last();

    singleGenre.simulate(`click`);
    expect(mocks.functionHandler).toHaveBeenCalledTimes(1);
  });
});