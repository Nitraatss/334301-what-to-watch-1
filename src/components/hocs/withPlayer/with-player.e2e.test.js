// Core
import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Component
import withPlayer from "./with-player.jsx";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withPlayer(MockComponent);

describe(`withPlayer hoc:`, () => {
  it(`Should revert playerActive state when call togglePlayer`, () => {
    const wrapper = shallow(<MockComponentWrapped />);

    wrapper.instance().togglePlayer();
    expect(wrapper.state().playerActive).toEqual(true);
  });
});
