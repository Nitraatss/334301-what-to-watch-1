// Core
import React, {Component} from "react";

const highOrderComponent = (WrappedComponent) => {
  return class HighOrderComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        activeCardIndex: null
      };

      this.handelActiveCardChange = this.handelActiveCardChange.bind(this);
    }

    handelActiveCardChange(activeCardIndex) {
      this.setState({activeCardIndex});
    }

    render() {
      return (
        <WrappedComponent
          handelActiveCardChange={this.handelActiveCardChange}
          {...this.props}
        />
      );
    }
  };
};

export default highOrderComponent;
