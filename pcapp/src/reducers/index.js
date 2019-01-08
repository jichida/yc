import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import app from './app';
import db from './db';
import userlogin from './userlogin';

import evaluatebarden from './evaluatebarden';
import evaluatenursingmeasures from './evaluatenursingmeasures';
import evaluatewoundsurface from './evaluatewoundsurface';

export default combineReducers({
  	app,
    db,
  	userlogin,
    evaluatebarden,
    evaluatenursingmeasures,
    evaluatewoundsurface,
  	form: formReducer,
  	router: routerReducer,
});
