// Core
import {func, shape, string} from "prop-types";
import React, {PureComponent} from "react";
import {withRouter} from "react-router";

const TABS = {
  OVERVIEW: `overview`,
  DETAILS: `details`,
  REVIEWS: `reviews`
};

class MovieNavigation extends PureComponent {
  constructor(props) {
    super(props);

    this._handelLinkClick = this._handelLinkClick.bind(this);
    this._setActiveTab = this._setActiveTab.bind(this);
  }

  render() {
    const {history} = this.props;
    const activeTab = this._setActiveTab(history.location.pathname.split(`/`));

    return (
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          <li
            className={`movie-nav__item ${
              activeTab === TABS.OVERVIEW ? `movie-nav__item--active` : ``
            }`}
          >
            <a
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
                this._handelLinkClick(`overview`);
              }}
              className="movie-nav__link"
            >
              Overview
            </a>
          </li>
          <li
            className={`movie-nav__item ${
              activeTab === TABS.DETAILS ? `movie-nav__item--active` : ``
            }`}
          >
            <a
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
                this._handelLinkClick(`details`);
              }}
              className="movie-nav__link"
            >
              Details
            </a>
          </li>
          <li
            className={`movie-nav__item ${
              activeTab === TABS.REVIEWS ? `movie-nav__item--active` : ``
            }`}
          >
            <a
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
                this._handelLinkClick(`reviews`);
              }}
              className="movie-nav__link"
            >
              Reviews
            </a>
          </li>
        </ul>
      </nav>
    );
  }

  _setActiveTab(path) {
    if (path.indexOf(TABS.OVERVIEW) > -1) {
      return TABS.OVERVIEW;
    }

    if (path.indexOf(TABS.DETAILS) > -1) {
      return TABS.DETAILS;
    }

    if (path.indexOf(TABS.REVIEWS) > -1) {
      return TABS.REVIEWS;
    }

    return TABS.OVERVIEW;
  }

  _handelLinkClick(tab) {
    const {match, history} = this.props;
    history.push(`${match.url}/${tab}`);
  }
}

MovieNavigation.propTypes = {
  history: shape({
    push: func.isRequired
  }).isRequired,
  match: shape({
    url: string.isRequired
  }).isRequired
};

export default withRouter(MovieNavigation);
