import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {
  actionChangeAuthorizationRequestStatus,
  actionChangeAuthorizationProcessStatus,
  actionChangeAuthorizationStatus,
  actionSetUserInfo,
  ActionType,
  Operation,
  reducer
} from "./user.js";

const mocks = {
  loadedUser: {
    id: 1,
    email: `some@mail.ru`,
    name: `name`,
    /* eslint-disable no-underscore-dangle */
    avatar_url: `url`
    /* eslint-enable */
  }
};

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing authorization status return correct action`, () => {
    expect(actionChangeAuthorizationStatus(false)).toEqual({
      type: ActionType.CHANGE_AUTHORIZATION_STATUS,
      payload: false
    });
  });

  it(`Action creator for changing authorization status return correct payload`, () => {
    expect(actionChangeAuthorizationStatus(true)).toEqual({
      type: ActionType.CHANGE_AUTHORIZATION_STATUS,
      payload: true
    });
  });

  it(`Action creator for changing authorization request status return correct action`, () => {
    expect(actionChangeAuthorizationRequestStatus(false)).toEqual({
      type: ActionType.CHANGE_AUTHORIZATION_REQUEST_STATUS,
      payload: false
    });
  });

  it(`Action creator for changing authorization request status return correct payload`, () => {
    expect(actionChangeAuthorizationRequestStatus(true)).toEqual({
      type: ActionType.CHANGE_AUTHORIZATION_REQUEST_STATUS,
      payload: true
    });
  });

  it(`Action creator for changing authorization process status return correct action`, () => {
    expect(actionChangeAuthorizationProcessStatus(false)).toEqual({
      type: ActionType.CHANGE_AUTHORIZATION_PROCESS_STATUS,
      payload: false
    });
  });

  it(`Action creator for changing authorization process status return correct payload`, () => {
    expect(actionChangeAuthorizationProcessStatus(true)).toEqual({
      type: ActionType.CHANGE_AUTHORIZATION_PROCESS_STATUS,
      payload: true
    });
  });

  it(`Action creator for loading user info returns correct action`, () => {
    expect(actionSetUserInfo({})).toEqual({
      type: ActionType.SET_USER_INFO,
      payload: {}
    });
  });

  it(`Action creator for loading user info returns payload with user info`, () => {
    expect(actionSetUserInfo(mocks.loadedUser)).toEqual({
      type: ActionType.SET_USER_INFO,
      payload: mocks.loadedUser
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthorizationRequired: false,
      authorizationFailed: false,
      authorized: false,
      currentUser: {
        userId: 1,
        userEmail: ``,
        userName: ``,
        userAvatar: ``
      }
    });
  });

  it(`Reducer should change authorized to given value`, () => {
    expect(
        reducer(
            {
              isAuthorizationRequired: false,
              authorizationFailed: false,
              authorized: false,
              currentUser: {
                userId: 1,
                userEmail: ``,
                userName: ``,
                userAvatar: ``
              }
            },
            {
              type: ActionType.CHANGE_AUTHORIZATION_STATUS,
              payload: true
            }
        )
    ).toEqual({
      isAuthorizationRequired: false,
      authorizationFailed: false,
      authorized: true,
      currentUser: {
        userId: 1,
        userEmail: ``,
        userName: ``,
        userAvatar: ``
      }
    });
  });

  it(`Reducer should change isAuthorizationRequired to given value`, () => {
    expect(
        reducer(
            {
              isAuthorizationRequired: false,
              authorizationFailed: false,
              authorized: false,
              currentUser: {
                userId: 1,
                userEmail: ``,
                userName: ``,
                userAvatar: ``
              }
            },
            {
              type: ActionType.CHANGE_AUTHORIZATION_REQUEST_STATUS,
              payload: true
            }
        )
    ).toEqual({
      isAuthorizationRequired: true,
      authorizationFailed: false,
      authorized: false,
      currentUser: {
        userId: 1,
        userEmail: ``,
        userName: ``,
        userAvatar: ``
      }
    });
  });

  it(`Reducer should change authorizationFailed to given value`, () => {
    expect(
        reducer(
            {
              isAuthorizationRequired: false,
              authorizationFailed: false,
              authorized: false,
              currentUser: {
                userId: 1,
                userEmail: ``,
                userName: ``,
                userAvatar: ``
              }
            },
            {
              type: ActionType.CHANGE_AUTHORIZATION_PROCESS_STATUS,
              payload: true
            }
        )
    ).toEqual({
      isAuthorizationRequired: false,
      authorizationFailed: true,
      authorized: false,
      currentUser: {
        userId: 1,
        userEmail: ``,
        userName: ``,
        userAvatar: ``
      }
    });
  });

  it(`Should make a correct API call to /login`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmsLoader = Operation.authorizeUser();

    apiMock.onPost(`/login`).reply(200, [{fake: true}]);

    return filmsLoader(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);
    });
  });
});
