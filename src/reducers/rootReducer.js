import { combineReducers } from 'redux';
import { books } from './booksReducer';

export const rootReducer = combineReducers({
	books
});
