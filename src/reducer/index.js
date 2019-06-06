import {combineReducers} from "redux";
import {reducer as filmsData} from "./filmsData/films-data";
import {reducer as user} from "./user/user";
import {reducer as reviews} from "./reviews/reviews";

const reducer = combineReducers({
  filmsData,
  user,
  reviews
});

export default reducer;
