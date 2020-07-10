import {combineReducers} from "redux";
import {reducer as data} from "./data/data.js";
import {reducer as list} from "./list/list.js";
import {reducer as user} from "./user/user.js";
import NameSpace from "./name-space.js";

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.LIST]: list,
  [NameSpace.USER]: user,
});
