import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';
import SelectField from 'material-ui/SelectField'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconDelete from 'material-ui/svg-icons/action/delete';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import { booksSortAction, booksRemoveAction } from '../../actions';
import * as s from './List.scss';

let books;

try {
	books = JSON.parse(localStorage['db']);
} catch (err) {
	books = [];
}

class List extends Component {

	state = {
		removedId: null,
		orderBy: null,
		isShowRemoveConfirm: false
	};

	onOrderByChange = (event, index, orderBy) => {
		this.setState({ orderBy });

		this.props.booksSortAction(orderBy);
	};

	onRemoveClick = (id) => {
		this.setState({
			removedId: id,
			isShowRemoveConfirm: true
		});
	};

	onEditClick = (id) => {
		this.props.history.push(`/books/${ id }/edit`);
	};

	onConfirmRemoveCancel = () => {
		this.setState({ isShowRemoveConfirm: false });
	};

	onConfirmRemoveSubmit = () => {
		this.props.booksRemoveAction(this.state.removedId);
		this.setState({ isShowRemoveConfirm: false });
	};

	onConfirmRemoveRequestClose = () => {
		this.setState({ isShowRemoveConfirm: false });
	};

	render() {
		const { books } = this.props;
		const { isShowRemoveConfirm } = this.state;
		const isShowEmpty = books.length === 0;
		const confirmRemoveActions = [
			<FlatButton
				label="Отмена"
				primary={true}
				onClick={this.onConfirmRemoveCancel}
			/>,
			<FlatButton
				label="Удалить"
				primary={true}
				onClick={this.onConfirmRemoveSubmit}
			/>,
		];


		return (
			<div className={s.block}>
				<SelectField
					className={s.orderBy}
					floatingLabelText="Сортировать по"
					value={this.state.orderBy}
					onChange={this.onOrderByChange}
				>
					<MenuItem value="title" primaryText="Заголовку"/>
					<MenuItem value="publicationYear" primaryText="Году публикации"/>
				</SelectField>

				{
					isShowEmpty
						?
							<div className={s.empty}>Список пуст</div>
						:
						(
							<GridList
								cols={4}
								cellHeight={280}
								padding={20}
							>
								{books.map((book) => {
									const previewStyle = book.preview ? { backgroundImage: `url(${ book.preview })` } : null;

									return <GridTile
										key={book.id}
										title={book.title}
										actionIcon={
											<span className={s.actions}>
												<IconButton onClick={() => this.onEditClick(book.id)}><IconEdit color="white"/></IconButton>
												<IconButton onClick={() => this.onRemoveClick(book.id)}><IconDelete color="white"/></IconButton>
											</span>
										}
									>
										<Link to={`/books/${ book.id }`}>
											<div className={s.preview} style={previewStyle}></div>
										</Link>
									</GridTile>
								})}
							</GridList>
						)
				}

				<Dialog
					actions={confirmRemoveActions}
					modal={false}
					open={isShowRemoveConfirm}
					onRequestClose={this.onConfirmRemoveRequestClose}
					contentStyle={{
						width: 400
					}}
				>
					Вы действительно хотите удалить книгу?
				</Dialog>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { books } = state;

	return { books };
};


const mapDispatchToProps = (dispatch) => bindActionCreators({
	booksSortAction,
	booksRemoveAction
}, dispatch);

const Container = connect(mapStateToProps, mapDispatchToProps)(List);

export { Container as List }