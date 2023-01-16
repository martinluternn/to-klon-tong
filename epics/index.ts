import { Action, AnyAction } from 'redux';
import { combineEpics, Epic } from 'redux-observable';

import mainEpics from './Main';

const epics: Epic<Action, AnyAction> = combineEpics(
    ...mainEpics,
);

export default epics;
