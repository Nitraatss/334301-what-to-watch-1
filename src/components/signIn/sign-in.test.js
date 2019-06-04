// Core
import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";

// Component
import {SignIn} from "./sign-in.jsx";

const mocks = {
  functionHandler: jest.fn()
};

describe(`SignIn:`, () => {
  it(`Correctly renders after relaunch`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <SignIn
              changeAuthorizationStatus={mocks.functionHandler}
              validateMail={mocks.functionHandler}
              validatePassword={mocks.functionHandler}
              emailError={false}
              passwordError={false}
              authorizationFailed={false}
            />
          </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
