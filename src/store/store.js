import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { rootReducer } from '../reducers';
import * as defaultStore from './default';

const books = localStorage.getItem('books');
let state;

if (books) {
	try {
		state = {
			books: JSON.parse(books)
		};
	} catch (err) {
		state = defaultStore;
	}
} else {
	state = defaultStore;
}

export const store = createStore(rootReducer, state, applyMiddleware(ReduxThunk));

store.subscribe(() => localStorage.setItem('books', JSON.stringify(store.getState().books)));