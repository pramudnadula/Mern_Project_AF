import { AlertReducer } from './AlertReducer'
import ResearchAreaReducer from './ResearchAreaReducer'
import { createStore, combineReducers } from "redux";
import StudentReducer from './StudentReducer';


const allreducers = new combineReducers({

    alert: AlertReducer,
    areas: ResearchAreaReducer,
    stu: StudentReducer

});

export default allreducers;

