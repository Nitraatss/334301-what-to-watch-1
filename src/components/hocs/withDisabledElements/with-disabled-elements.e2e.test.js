// Core
import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Component
import withDisabledElements from "./with-disabled-elements.jsx";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withDisabledElements(MockComponent);

describe(`withDisabledElements hoc:`, () => {
  it(`Should change submitButtonDisabled state when call onSubmitButtonStateChange to given value`, () => {
    const wrapper = shallow(<MockComponentWrapped />);

    wrapper.instance().onSubmitButtonStateChange(false);
    expect(wrapper.state().submitButtonDisabled).toEqual(false);
  });

  it(`Should change textareaDisabled state when call onTextareaStateChange to given value`, () => {
    const wrapper = shallow(<MockComponentWrapped />);

    wrapper.instance().onTextareaStateChange(false);
    expect(wrapper.state().textareaDisabled).toEqual(false);
  });
});
