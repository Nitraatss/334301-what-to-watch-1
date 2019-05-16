// Core
import React from "react";
import Enzyme, {mount} from "enzyme";
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
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
    },
    {
      id: `2`,
      title: `Killers Bodyguard`,
      genre: [`Crime`, `Comedy`],
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
    },
    {
      id: `3`,
      title: `Star Wars`,
      genre: [`Sci-Fi`],
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
    },
    {
      id: `4`,
      title: `The Grand Budapest Hotel`,
      genre: [`Drama`, `Comedy`],
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
    },
    {
      id: `5`,
      title: `The Cabin in the Woods`,
      genre: [`Thriller`],
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
    }
  ]
};

describe(`MoviesList:`, () => {
  it(`Should change activeCardIndex state on small-card film index after mouse enter card`, () => {
    const moviesList = mount(<MoviesList films={mocks.films} />);

    const smallMovieCard = moviesList.find(`.small-movie-card`).last();
    smallMovieCard.simulate(`mouseenter`);
    expect(moviesList.state(`activeCardIndex`)).toEqual(`5`);
  });
});
