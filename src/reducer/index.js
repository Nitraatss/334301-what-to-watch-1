import {combineReducers} from "redux";
import {reducer as filmsData} from "./filmsData/filmsData";

const reducer = combineReducers({
  filmsData
});

export default reducer;
