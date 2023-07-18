import { createStore, applyMiddleware, compose} from 'redux';
import  reducer  from './Reducer'; 
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

export const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunk))
);