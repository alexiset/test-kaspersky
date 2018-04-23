import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Form } from '../../components/Form';
import { booksEditAction } from '../../actions';

class Add extends Component {

	onCancelClick = () => {
		this.props.history.goBack();
	};

	onSubmitClick = () => {
		this.onEditFormSubmit();
	};

	onEditFormMount = (options) => {
		this.onEditFormSubmit = options.onSubmit;
	};

	onSubmit = (book) => {
		this.props.booksEditAction(book);
		this.props.history.goBack();
	};

	render() {
		const { book } = this.props;
		const actions = [
			<FlatButton
				label="Отмена"
				primary={true}
				onClick={this.onCancelClick}
			/>,
			<FlatButton
				label="Сохранить"
				primary={true}
				onClick={this.onSubmitClick}
			/>,
		];

		return (
			<Dialog
				title="Редактирование"
				actions={actions}
				modal={true}
				open={true}
				autoScrollBodyContent={true}
			>
				<Form
					{...book}
					onMount={this.onEditFormMount}
					onSubmit={this.onSubmit}
					onHideSuccess={this.onHideSuccess}
				/>
			</Dialog>
		);
	}
}

const mapStateToProps = (state, props) => {
	const { books } = state;
	const id = Number(props.match.params.id);

	return {
		book: books.filter((item) => item.id === id).pop()
	};
};


const mapDispatchToProps = (dispatch) => bindActionCreators({
	booksEditAction
}, dispatch);

const Container = connect(mapStateToProps, mapDispatchToProps)(Add);

export { Container as Edit }