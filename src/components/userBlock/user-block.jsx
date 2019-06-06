// Core
import React, {PureComponent} from "react";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {compose} from "redux";

class UserBlock extends PureComponent {
  constructor(props) {
    super(props);

    this._handelAvatarClick = this._handelAvatarClick.bind(this);
  }

  render() {
    const {authorized, user} = this.props;

    if (!authorized) {
      return (
        <div className="user-block">
          <Link to="/login" className="user-block__link">
            Sign in
          </Link>
        </div>
      );
    } else {
      return (
        <div className="user-block">
          <div className="user-block__avatar" onClick={this._handelAvatarClick}>
            <img
              src={`https://es31-server.appspot.com/${user.userAvatar}`}
              alt={user.userName}
              width="63"
              height="63"
            />
          </div>
        </div>
      );
    }
  }

  _handelAvatarClick() {
    this.props.history.push(`/favorites`);
  }
}

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
  authorized: state.user.authorized
});

export {UserBlock};

export default compose(
    connect(
        mapStateToProps,
        null
    ),
    withRouter
)(UserBlock);
