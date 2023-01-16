import { combineReducers, Reducer } from 'redux';
import mainReducer from './Main';

const rootReducers: Reducer = combineReducers({
    main: mainReducer,
});

export default rootReducers;
