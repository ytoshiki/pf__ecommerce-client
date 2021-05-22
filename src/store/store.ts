import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

// applyMiddleware supercharges createStore with middleware:
export const store = createStore(rootReducer, {}, applyMiddleware(thunk, logger));
