import { events } from '../constants/events';

export const books = (state = null, action) => {
	switch (action.type) {

		case events.BOOKS_SORT: {
			const { orderBy } = action.data;

			return state.sort((a, b) => {
				let valA,
					valB;

				if (orderBy === 'title') {
					valA = String(a.title).toLowerCase();
					valB = String(b.title).toLowerCase();
				} else if (orderBy === 'publicationYear') {
					valA = a.publicationYear;
					valB = b.publicationYear;
				} else {
					valA = a.id;
					valB = b.id;
				}

				if (valA > valB) {
					return 1;
				} else if (valA < valB) {
					return -1;
				} else {
					return 0;
				}
			});

			break;
		}

		case events.BOOKS_ADD: {
			const { book } = action.data;

			return state.concat(book);

			break;
		}

		case events.BOOKS_EDIT: {
			const { book } = action.data;

			return state.map((item) => item.id === book.id ? book : item);

			break;
		}

		case events.BOOKS_REMOVE: {
			const { id } = action.data;

			return state.filter((item) => item.id !== id);

			break;
		}
	}

	return state;
};
