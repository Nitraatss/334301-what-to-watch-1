// Core
import React from "react";
import renderer from "react-test-renderer";

// Component
import MoviesList from "./moviesList.jsx";

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

describe(`MoviesList:`, () => {
  it(`Correctly renders after relaunch`, () => {
    const tree = renderer.create(<MoviesList films={mocks.films} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
