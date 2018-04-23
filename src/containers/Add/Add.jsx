import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Form } from '../../components/Form';
import { booksAddAction } from '../../actions';

class Add extends Component {

	onCancelClick = () => {
		this.props.history.goBack();
	};

	onSubmitClick = () => {
		this.onAddFormSubmit();
	};

	onAddFormMount = (options) => {
		this.onAddFormSubmit = options.onSubmit;
	};

	onSubmit = (book) => {
		this.props.booksAddAction(book);
		this.props.history.goBack();
	};

	render() {
		const actions = [
			<FlatButton
				label="Отмена"
				primary={true}
				onClick={this.onCancelClick}
			/>,
			<FlatButton
				label="Добавить"
				primary={true}
				onClick={this.onSubmitClick}
			/>,
		];

		return (
			<Dialog
				title="Новая книга"
				actions={actions}
				modal={true}
				open={true}
				autoScrollBodyContent={true}
			>
				<Form
					onMount={this.onAddFormMount}
					onSubmit={this.onSubmit}
					onHideSuccess={this.onHideSuccess}
				/>
			</Dialog>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {};
};


const mapDispatchToProps = (dispatch) => bindActionCreators({
	booksAddAction
}, dispatch);

const Container = connect(mapStateToProps, mapDispatchToProps)(Add);

export { Container as Add }