// Core
import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Component
import MoviesList from "./moviesList.jsx";

Enzyme.configure({adapter: new Adapter()});

const mocks = {
  films: [
    {
      id: `1`,
      title: `John Wick`,
      genre: [`Crime`],
      preview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
    },
    {
      id: `2`,
      title: `Killers Bodyguard`,
      genre: [`Crime`, `Comedy`],
      preview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
    },
    {
      id: `3`,
      title: `Star Wars`,
      genre: [`Sci-Fi`],
      preview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
    },
    {
      id: `4`,
      title: `The Grand Budapest Hotel`,
      genre: [`Drama`, `Comedy`],
      preview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
    },
    {
      id: `5`,
      title: `The Cabin in the Woods`,
      genre: [`Thriller`],
      preview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
    }
  ]
};

it(`MoviesList should change state on small card hover`, () => {
  const moviesList = shallow(<MoviesList films={mocks.films} />);

  const smallMovieCard = moviesList.find(`.small-movie-card`).last();
  smallMovieCard.simulate(`mouseenter`);
  expect(smallMovieCard.state(`activeCardIndex`)).to.equal(`5`);
});
