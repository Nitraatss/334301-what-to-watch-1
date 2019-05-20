import {ActionCreator, reducer} from "./reducer";

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
      genre: [`Crime`, `Comedies`],
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
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
      genre: [`Dramas`, `Comedies`],
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
    },
    {
      id: `5`,
      title: `The Cabin in the Woods`,
      genre: [`Thrillers`],
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
    }
  ]
};

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing genre returns correct action`, () => {
    expect(ActionCreator.changeGenre()).toEqual({
      type: `CHANGE_GENRE`,
      payload: `All genres`
    });
  });

  it(`Action creator for changing genre returns payload with new genre`, () => {
    expect(ActionCreator.changeGenre(`Some genre`)).toEqual({
      type: `CHANGE_GENRE`,
      payload: `Some genre`
    });
  });

  it(`Action creator for changing films returns action to change films if choosed some genre`, () => {
    expect(ActionCreator.changeFilms(`Some genre`)).toEqual({
      type: `CHANGE_FILMS`
    });
  });

  it(`Action creator for changing films returns action to show all films if choosed 'All genres' genre`, () => {
    expect(ActionCreator.changeFilms(`All genres`)).toEqual({
      type: `SHOW_ALL`
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      activeGenre: `All genres`,
      films: mocks.films
    });
  });

  it(`Reducer should change genre to given value`, () => {
    expect(
        reducer(
            {
              activeGenre: `All genres`,
              films: mocks.films
            },
            {
              type: `CHANGE_GENRE`,
              payload: `Test Genre`
            }
        )
    ).toEqual({
      activeGenre: `Test Genre`,
      films: mocks.films
    });
  });

  it(`Reducer should filter films after genre change`, () => {
    expect(
        reducer(
            {
              activeGenre: `Sci-Fi`,
              films: mocks.films
            },
            {
              type: `CHANGE_FILMS`
            }
        )
    ).toEqual({
      activeGenre: `Sci-Fi`,
      films: [
        {
          id: `3`,
          title: `Star Wars`,
          genre: [`Sci-Fi`],
          poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
          preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
        }
      ]
    });
  });

  it(`Reducer should return to initial state if choosed 'All genres' genre`, () => {
    expect(
        reducer(
            {
              activeGenre: `Crime`,
              films: [
                {
                  id: `1`,
                  title: `John Wick`,
                  genre: [`Crime`],
                  poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
                  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
                }
              ]
            },
            {
              type: `SHOW_ALL`
            }
        )
    ).toEqual({
      activeGenre: `All genres`,
      films: mocks.films
    });
  });
});