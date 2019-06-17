// Core
import React from "react";
import renderer from "react-test-renderer";

// Component
import {SignIn} from "./sign-in.jsx";

const mocks = {
  onHomeRedirect: jest.fn(),
  changeAuthorizationStatus: jest.fn(),
  onEmailValidate: jest.fn(),
  onPasswordValidate: jest.fn(),
  emailError: false,
  passwordError: false,
  authorizationFailed: false,
  authorized: true,
  history: {
    push: jest.fn()
  }
};

describe(`SignIn:`, () => {
  it(`Correctly renders after relaunch`, () => {
    const tree = renderer.create(<SignIn {...mocks} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
