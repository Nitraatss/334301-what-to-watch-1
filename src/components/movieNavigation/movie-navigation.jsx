// Core
import {func, shape, string} from "prop-types";
import React, {PureComponent} from "react";
import {compose} from "redux";
import {withRouter} from "react-router";

// HOCs
import withActiveItem from "../hocs/withActiveItem/with-active-item.jsx";

class MovieNavigation extends PureComponent {
  constructor(props) {
    super(props);

    this._handelLinkClick = this._handelLinkClick.bind(this);
  }

  render() {
    const {activeItem} = this.props;
    return (
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          <li
            className={`movie-nav__item ${
              activeItem === `overview` ? `movie-nav__item--active` : ``
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
              activeItem === `details` ? `movie-nav__item--active` : ``
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
              activeItem === `reviews` ? `movie-nav__item--active` : ``
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

  _handelLinkClick(tab) {
    const {match, history, changeActiveItem} = this.props;
    changeActiveItem(tab);
    history.push(`${match.url}/${tab}`);
  }
}

MovieNavigation.propTypes = {
  activeItem: string,
  changeActiveItem: func.isRequired,
  history: shape({
    push: func.isRequired
  }).isRequired,
  match: shape({
    url: string.isRequired
  }).isRequired
};

export default compose(
    withActiveItem,
    withRouter
)(MovieNavigation);