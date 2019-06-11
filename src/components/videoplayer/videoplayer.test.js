// Core
import React from "react";
import renderer from "react-test-renderer";

// Component
import Videoplayer from "./videoplayer.jsx";

const mocks = {poster: `poster`, preview: `preview`};
describe(`Videoplayer:`, () => {
  it(`Correctly renders after relaunch`, () => {
    const tree = renderer.create(<Videoplayer {...mocks} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
