const MAXIMUM_GENRES_NUMBER = 9;
const MAXIMUN_FILMS_PER_PACK = 20;

const initialState = {
  activeGenre: `All genres`,
  films: [],
  loadedFilms: [],
  visibleFilms: [],
  genres: [],
  activeFilm: {},
  favoriteFilms: []
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  CHANGE_FILMS: `CHANGE_FILMS`,
  SHOW_ALL: `SHOW_ALL`,
  LOAD_FILMS: `LOAD_FILMS`,
  FORM_GENRES: `FORM_GENRES`,
  FORM_VISIBLE_FILMS: `FORM_VISIBLE_FILMS`,
  CLEAR_VISIBLE_FILMS: `CLEAR_VISIBLE_FILMS`,
  CHANGE_ACTIVE_FILM: `CHANGE_ACTIVE_FILM`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  ADD_FILM_TO_FAVORITE: `ADD_FILM_TO_FAVORITE`,
  LOAD_FAVORITE_FILMS: `LOAD_FAVORITE_FILMS`
};

const ActionCreator = {
  changeGenre: (newGenre = `All genres`) => ({
    type: ActionType.CHANGE_GENRE,
    payload: newGenre
  }),

  changeFilms: () => {
    return {
      type: ActionType.CHANGE_FILMS
    };
  },

  showAllFilms: () => {
    return {
      type: ActionType.SHOW_ALL
    };
  },

  loadFilms: (loadedFilms) => {
    return {
      type: ActionType.LOAD_FILMS,
      payload: loadedFilms
    };
  },

  loadPromoFilm: (promoFilm) => {
    return {
      type: ActionType.LOAD_PROMO_FILM,
      payload: promoFilm
    };
  },

  loadFavoriteFilms: (loadedFilms) => {
    return {
      type: ActionType.LOAD_FAVORITE_FILMS,
      payload: loadedFilms
    };
  },

  formGenres: (loadedFilms) => {
    return {
      type: ActionType.FORM_GENRES,
      payload: loadedFilms
    };
  },

  formVisibleFilms: (filmId = null) => {
    return {
      type: ActionType.FORM_VISIBLE_FILMS,
      payload: filmId
    };
  },

  clearVisibleFilms: () => {
    return {
      type: ActionType.CLEAR_VISIBLE_FILMS
    };
  },

  changeActiveFilm: (filmId) => {
    return {
      type: ActionType.CHANGE_ACTIVE_FILM,
      payload: filmId
    };
  },

  addFilmToFavorite: () => {
    return {
      type: ActionType.ADD_FILM_TO_FAVORITE
    };
  }
};

const updateVisibleFilms = (films, currentVisibleFilms, filmId) => {
  let visibleFilms = currentVisibleFilms.slice();
  let filmsPack = films.filter((film) => film.id !== filmId);

  if (visibleFilms.length < filmsPack.length) {
    if (!visibleFilms.length) {
      if (filmsPack.length > MAXIMUN_FILMS_PER_PACK) {
        visibleFilms = filmsPack.slice(0, MAXIMUN_FILMS_PER_PACK);
      } else {
        visibleFilms = filmsPack.slice(0, filmsPack.length);
      }
    } else {
      if (visibleFilms.length + MAXIMUN_FILMS_PER_PACK >= filmsPack.length) {
        visibleFilms = visibleFilms.concat(
            filmsPack.slice(visibleFilms.length, filmsPack.length)
        );
      } else {
        visibleFilms = visibleFilms.concat(
            filmsPack.slice(
                visibleFilms.length,
                visibleFilms.length + MAXIMUN_FILMS_PER_PACK
            )
        );
      }
    }
  }

  return visibleFilms;
};

const formFilms = (films) => {
  return films.map((film) => {
    return {
      backgroundColor: film.background_color,
      backgroundImage: film.background_image,
      description: film.description,
      director: film.director,
      genre: film.genre,
      id: film.id,
      isFavorite: film.is_favorite,
      name: film.name,
      poster: film.preview_image,
      posterImage: film.poster_image,
      preview: film.preview_video_link,
      rating: film.rating,
      released: film.released,
      runTime: film.run_time,
      scoresCount: film.scores_count,
      starring: film.starring,
      videoLink: film.video_link
    };
  });
};

const formGenres = (loadedFilms) => {
  const newGenres = [];

  loadedFilms.forEach((film, counter) => {
    if (
      !newGenres.some((genre) => genre === film.genre) &&
      newGenres.length <= MAXIMUM_GENRES_NUMBER
    ) {
      newGenres.push(film.genre);
    }
  });

  newGenres.sort();
  newGenres.unshift(`All genres`);

  return newGenres;
};

const Operation = {
  loadFilms: () => (dispatch, _getState, api) => {
    return api
      .get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response.data));
        dispatch(ActionCreator.formGenres(response.data));
        dispatch(ActionCreator.formVisibleFilms());
      })
      .catch((error) => {
        console.log(error);
      });
  },

  loadFavoriteFilms: () => (dispatch, _getState, api) => {
    return api
      .get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavoriteFilms(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  },

  loadPromo: () => (dispatch, _getState, api) => {
    return api
      .get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoFilm([response.data]));
        dispatch(ActionCreator.changeActiveFilm());
      })
      .catch((error) => {
        console.log(error);
      });
  },

  addFilmToFavourite: (filmId, status) => (dispatch, _getState, api) => {
    return api
      .post(`/favorite/${filmId}/${status ? 0 : 1}`, {
        film_id: filmId,
        status
      })
      .then((response) => {
        dispatch(ActionCreator.addFilmToFavorite());
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return Object.assign({}, state, {
        activeGenre: action.payload
      });

    case ActionType.CHANGE_FILMS:
      return Object.assign({}, state, {
        films: state.loadedFilms.filter((film) => {
          return film.genre === state.activeGenre;
        })
      });

    case ActionType.SHOW_ALL:
      return Object.assign({}, state, {
        films: state.loadedFilms
      });

    case ActionType.LOAD_FAVORITE_FILMS:
      return Object.assign({}, state, {
        favoriteFilms: formFilms(action.payload)
      });

    case ActionType.LOAD_FILMS:
      return Object.assign({}, state, {
        films: formFilms(action.payload),
        loadedFilms: formFilms(action.payload)
      });

    case ActionType.FORM_GENRES:
      return Object.assign({}, state, {
        genres: formGenres(action.payload)
      });

    case ActionType.FORM_VISIBLE_FILMS:
      const newVisibleFilms = updateVisibleFilms(
          state.films,
          state.visibleFilms,
          action.payload
      );

      return Object.assign({}, state, {
        visibleFilms: newVisibleFilms
      });

    case ActionType.CLEAR_VISIBLE_FILMS:
      return Object.assign({}, state, {
        visibleFilms: []
      });

    case ActionType.LOAD_PROMO_FILM:
      const formedPromo = formFilms(action.payload)[0];
      return Object.assign({}, state, {
        promoFilm: formedPromo
      });

    case ActionType.CHANGE_ACTIVE_FILM:
      return Object.assign({}, state, {
        activeFilm: !action.payload
          ? state.promoFilm
          : state.loadedFilms[
              state.loadedFilms.findIndex((film) => {
                return film.id === parseInt(action.payload);
              })
          ]
      });

    case ActionType.ADD_FILM_TO_FAVORITE:
      const updatedActiveFilm = Object.assign({}, state.activeFilm);
      updatedActiveFilm.isFavorite = !updatedActiveFilm.isFavorite;

      return Object.assign({}, state, {
        activeFilm: updatedActiveFilm
      });
  }

  return state;
};

export {
  formFilms,
  formGenres,
  updateVisibleFilms,
  ActionType,
  ActionCreator,
  Operation,
  reducer
};
