import React, {PureComponent} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {actionPostReview, Operation} from "../../reducer/reviews/reviews";

// Components
import UserBlock from "../userBlock/user-block.jsx";
import Rating from "../rating/rating.jsx";
import withPrivatePath from "../hocs/withPrivatePath/with-private-path.jsx";
import withActiveItem from "../hocs/withActiveItem/with-active-item.jsx";

const RATING_MULTIPLER = 2;

class ReviewPage extends PureComponent {
  constructor(props) {
    super(props);

    this.message = React.createRef();
    this.state = {
      submitButtonDisabled: true,
      textareaDisabled: false
    };

    this._handelHomeLinkClick = this._handelHomeLinkClick.bind(this);
    this._handelMovieTitleClick = this._handelMovieTitleClick.bind(this);
    this._handelMessageInput = this._handelMessageInput.bind(this);
    this._handelFormSubmit = this._handelFormSubmit.bind(this);
  }

  componentDidMount() {
    const {prepareToPost} = this.props;

    prepareToPost();
  }

  componentDidUpdate() {
    const {reviewPostedStatus: reviewWasAdded, history, match} = this.props;

    if (reviewWasAdded) {
      history.push(`/film/${match.params.id}`);
    } else {
      this.setState({
        submitButtonDisabled: false,
        textareaDisabled: false
      });
    }
  }

  _handelFormSubmit(evt) {
    evt.preventDefault();

    const {postReview, activeFilm, activeItem: starsNumber} = this.props;

    const rating = starsNumber
      ? starsNumber * RATING_MULTIPLER
      : RATING_MULTIPLER;
    const comment = this.message.current.value;

    this.setState({
      submitButtonDisabled: true,
      textareaDisabled: true
    });

    postReview(activeFilm.id, {rating, comment});
  }

  _handelMessageInput(evt) {
    if (evt.target.value.length >= 50 && evt.target.value.length <= 200) {
      this.setState({
        submitButtonDisabled: false
      });
    } else {
      this.setState({
        submitButtonDisabled: true
      });
    }
  }

  _handelHomeLinkClick(evt) {
    evt.preventDefault();

    const {homeRedirect} = this.props;

    homeRedirect();
  }

  _handelMovieTitleClick(evt) {
    evt.preventDefault();
    const {history, match} = this.props;

    history.push(`/film/${match.params.id}`);
  }

  render() {
    const {
      activeFilm,
      history,
      match,
      changeActiveItem,
      activeItem: starsNumber
    } = this.props;

    const {submitButtonDisabled, textareaDisabled} = this.state;

    return (
      <>
        <div className="visually-hidden">
          <svg xmlns="http://www.w3.org/2000/svg">
            <symbol id="add" viewBox="0 0 19 20">
              <title>+</title>
              <desc>Created with Sketch.</desc>
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <polygon
                  id="+"
                  fill="#EEE5B5"
                  points="10.777832 11.2880859 10.777832 19.5527344 8.41650391 19.5527344 8.41650391 11.2880859 0.627929688 11.2880859 0.627929688 8.92675781 8.41650391 8.92675781 8.41650391 0.662109375 10.777832 0.662109375 10.777832 8.92675781 18.5664062 8.92675781 18.5664062 11.2880859"
                />
              </g>
            </symbol>
            <symbol id="full-screen" viewBox="0 0 27 27">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.8571 0H16V3.14286H23.8571V11H27V3.14286V0H23.8571Z"
                fill="#FFF9D9"
                fillOpacity="0.7"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27 23.8571V16H23.8571V23.8571H16V27H23.8571H27L27 23.8571Z"
                fill="#FFF9D9"
                fillOpacity="0.7"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 3.14286L0 11H3.14286L3.14286 3.14286L11 3.14286V0H3.14286H0L0 3.14286Z"
                fill="#FFF9D9"
                fillOpacity="0.7"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.14286 27H11V23.8571H3.14286L3.14286 16H0L0 23.8571V27H3.14286Z"
                fill="#FFF9D9"
                fillOpacity="0.7"
              />
            </symbol>
            <symbol id="in-list" viewBox="0 0 18 14">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.40513 5.35353L6.1818 8.90902L15.5807 0L18 2.80485L6.18935 14L0 8.17346L2.40513 5.35353Z"
                fill="#EEE5B5"
              />
            </symbol>
            <symbol id="pause" viewBox="0 0 14 21">
              <title>Artboard</title>
              <desc>Created with Sketch.</desc>
              <g
                id="Artboard"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <polygon
                  id="Line"
                  fill="#EEE5B5"
                  fillRule="nonzero"
                  points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21"
                />
                <polygon
                  id="Line"
                  fill="#EEE5B5"
                  fillRule="nonzero"
                  points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21"
                />
              </g>
            </symbol>
            <symbol id="play-s" viewBox="0 0 19 19">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0L19 9.5L0 19V0Z"
                fill="#EEE5B5"
              />
            </symbol>
          </svg>
        </div>

        <section className="movie-card movie-card--full">
          <div className="movie-card__header">
            <div className="movie-card__bg">
              <img src={activeFilm.backgroundImage} alt={activeFilm.name} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header">
              <div className="logo">
                <a
                  className="logo__link"
                  href="#"
                  onClick={this._handelHomeLinkClick}
                >
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </a>
              </div>

              <nav className="breadcrumbs">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <a
                      href="#"
                      className="breadcrumbs__link"
                      onClick={this._handelMovieTitleClick}
                    >
                      {activeFilm.name}
                    </a>
                  </li>
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link">Add review</a>
                  </li>
                </ul>
              </nav>

              <UserBlock />
            </header>

            <div className="movie-card__poster movie-card__poster--small">
              <img
                src={activeFilm.posterImage}
                alt={activeFilm.name}
                width="218"
                height="327"
              />
            </div>
          </div>

          <div className="add-review">
            <form action="#" className="add-review__form">
              <Rating activeStar={starsNumber} onStarClick={changeActiveItem} />

              <div className="add-review__text">
                <textarea
                  className="add-review__textarea"
                  name="review-text"
                  id="review-text"
                  placeholder="Review text"
                  ref={this.message}
                  onInput={this._handelMessageInput}
                  disabled={textareaDisabled}
                />
                <div className="add-review__submit">
                  <button
                    className="add-review__btn"
                    type="submit"
                    onClick={this._handelFormSubmit}
                    disabled={submitButtonDisabled}
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  reviewPostedStatus: state.reviews.reviewPostedStatus
});

const mapDispatchToProps = (dispatch) => ({
  postReview: (filmId, reviewInfo) => {
    dispatch(Operation.postReview(filmId, reviewInfo));
  },

  prepareToPost: () => {
    dispatch(actionPostReview(false));
  }
});

export {ReviewPage};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withPrivatePath,
    withActiveItem,
    withRouter
)(ReviewPage);
