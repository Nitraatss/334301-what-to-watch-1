// Core
import React from "react";
import renderer from "react-test-renderer";

// Component
import Main from "./main.jsx";

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

describe(`Main:`, () => {
  it(`Correctly renders after relaunch`, () => {
    const tree = renderer.create(<Main films={mocks.films} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
