import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import { Book } from '../../components/Book';

class Detail extends Component {

	onRequestClose = () => {
		this.props.history.goBack();
	};

	render() {
		const { book } = this.props;

		return (
			<Dialog
				title={book.title}
				modal={false}
				open={true}
				autoScrollBodyContent={true}
				onRequestClose={this.onRequestClose}
			>
				<Book book={book}/>
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

}, dispatch);

const Container = connect(mapStateToProps, mapDispatchToProps)(Detail);

export { Container as Detail }