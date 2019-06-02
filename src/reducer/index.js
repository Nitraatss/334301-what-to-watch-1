import {combineReducers} from "redux";
import {reducer as filmsData} from "./filmsData/filmsData";
import {reducer as user} from "./user/user";

const reducer = combineReducers({
  filmsData,
  user
});

export default reducer;
