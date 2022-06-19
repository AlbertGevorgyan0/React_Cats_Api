import {applyMiddleware, combineReducers, createStore} from "redux"
import {allReducer, all} from "../features/all/allSlice"
import thunk from "redux-thunk"
const store = createStore(combineReducers({
    all:allReducer,
}),{
    all:{
        categories:[
            
        ],
    }
},applyMiddleware(thunk));
export default store