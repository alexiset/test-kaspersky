import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import * as s from './Head.scss';

export class Head extends Component {

	onAddButtonClick = () => {
		this.props.history.push('/add');
	};

	render() {
		return (
			<AppBar
				title="Книги"
				showMenuIconButton={false}
				iconElementRight={
					<RaisedButton
						label="Добавить"
						className={s.add}
						onClick={this.onAddButtonClick}
					/>
				}
			/>
		);
	}

}