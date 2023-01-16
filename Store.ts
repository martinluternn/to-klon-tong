import {
    applyMiddleware,
    createStore,
    Middleware,
    Store,
} from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import rootEpics from './epics';
import rootReducers from './reducers';
import getApi from './apis';
import { AppState } from './AppState';
import Singleton from './tools/Singleton';

function configureStore(): Store<AppState> {
    const epicMiddleware = createEpicMiddleware({
        dependencies: {
            getApi,
        },
    });
    const middlewares: Middleware[] = [epicMiddleware];
    middlewares.push(createLogger());
    const customStore: Store = createStore(
        rootReducers,
        applyMiddleware(...middlewares),
    );

    epicMiddleware.run(rootEpics);
    return customStore;
}

class AppStore extends Singleton<Store<AppState>> {
    constructor() {
        super();
        this.initialize();
    }

    public initialize() {
        this.instance = configureStore();
        this.hasInitialized = true;
    }

    public getState(): AppState {
        if (!this.instance)
            throw new Error('Store is not initialized yet');
        return this.instance.getState();
    }

    public getStore(): Store<AppState> {
        if (!this.initialize)
            throw new Error('Store is not initialized yet');
        return this.instance!!;
    }
}

const appStore: AppStore = new AppStore();
export default appStore;
