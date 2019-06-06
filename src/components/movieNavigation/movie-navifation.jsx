// Core
import React, {PureComponent} from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import {compose} from "redux";

import withActiveItem from "../hocs/withActiveItem/with-active-item.jsx";

class MovieNavigation extends PureComponent {
  constructor(props) {
    super(props);

    this._handelLinkClick = this._handelLinkClick.bind(this);
  }

  _handelLinkClick(tab) {
    const {match, history, changeActiveItem} = this.props;
    changeActiveItem(tab);
    history.push(`${match.url}/${tab}`);
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
              onClick={() => {
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
              onClick={() => {
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
              onClick={(evt) => {
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
}

export default compose(
    withActiveItem,
    withRouter
)(MovieNavigation);
