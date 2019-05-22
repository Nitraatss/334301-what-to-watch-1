// Core
import React, {PureComponent} from "react";

const withActiveCard = (WrappedComponent) => {
  return class WithActiveCard extends PureComponent {
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

export default withActiveCard;
