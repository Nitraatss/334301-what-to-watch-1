// Core
import React, {PureComponent} from "react";
import {bool} from "prop-types";
import {Redirect} from "react-router-dom";

const withPrivatePath = (WrappedComponent) => {
  class WithPrivatePath extends PureComponent {
    constructor(props) {
      super(props);
    }

    render() {
      const {authorized} = this.props;

      if (authorized) {
        return <WrappedComponent {...this.props} />;
      } else {
        return <Redirect to="/" />;
      }
    }
  }

  WithPrivatePath.propTypes = {
    authorized: bool.isRequired
  };

  return WithPrivatePath;
};

export default withPrivatePath;
