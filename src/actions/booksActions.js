import { events } from '../constants/events';

export const booksSortAction = (orderBy) => (dispatch) => {
	dispatch({
		type: events.BOOKS_SORT,
		data: {
			orderBy
		}
	});
};

export const booksAddAction = (book) => (dispatch) => {
	dispatch({
		type: events.BOOKS_ADD,
		data: {
			book
		}
	});
};

export const booksEditAction = (book) => (dispatch) => {
	dispatch({
		type: events.BOOKS_EDIT,
		data: {
			book
		}
	});
};

export const booksRemoveAction = (id) => (dispatch) => {
	dispatch({
		type: events.BOOKS_REMOVE,
		data: {
			id
		}
	});
};