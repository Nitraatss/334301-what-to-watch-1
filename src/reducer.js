import films from "./mocks/films.js";

const initialState = {
  activeGenre: `All genres`,
  films
};

const ActionCreator = {
  changeGenre: (newGenre) => ({
    type: `CHANGE_GENRE`,
    payload: newGenre
  }),

  changeFilms: (newGenre) => {
    if (newGenre === `All genres`) {
      return {
        type: `SHOW_ALL`
      };
    } else {
      return {
        type: `CHANGE_FILMS`
      };
    }
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_GENRE`:
      return Object.assign({}, state, {
        activeGenre: action.payload
      });

    case `CHANGE_FILMS`:
      return Object.assign({}, state, {
        films: films.filter((film) => {
          return film.genre.some((genre) => {
            return genre === state.activeGenre;
          });
        })
      });

    case `SHOW_ALL`:
      return Object.assign({}, initialState);
  }

  return state;
};

export {ActionCreator, reducer};
