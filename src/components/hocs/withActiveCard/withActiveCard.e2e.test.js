// Core
import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Component
import withActiveCard from "./withActiveCard.jsx";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveCard(MockComponent);

describe(`withActiveCard hoc:`, () => {
  it(`Should change activeCardIndex state when call handelActiveCardChange to given value`, () => {
    const wrapper = shallow(<MockComponentWrapped />);

    wrapper.instance().handelActiveCardChange(3);
    expect(wrapper.state().activeCardIndex).toEqual(3);
  });
});
