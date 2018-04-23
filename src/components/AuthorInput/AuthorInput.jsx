import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import IconDelete from 'material-ui/svg-icons/action/delete';
import * as s from './AuthorInput.scss';

export class AuthorInput extends Component {

	state = {
		firstName: '',
		lastName: ''
	};

	componentWillMount() {
		const { firstName, lastName } = this.props;

		this.setState({
			firstName,
			lastName
		});
	}

	onChange(firstName, lastName) {
		this.props.onChange && this.props.onChange({
			id: this.props.id,
			firstName,
			lastName
		});

		this.setState({
			firstName,
			lastName
		});
	}

	onFirstNameChange = (event) => {
		const firstName = event.target.value.trim();

		this.onChange(firstName, this.state.lastName);
	};

	onLastNameChange = (event) => {
		const lastName = event.target.value.trim();

		this.onChange(this.state.firstName, lastName);
	};

	render() {
		const { firstName, lastName } = this.state;
		const { onRemove } = this.props;

		return (
			<div className={s.block}>
				<TextField
					className={s.firstName}
					floatingLabelText="Имя"
					value={firstName}
					onChange={this.onFirstNameChange}
				/>

				<TextField
					className={s.lastName}
					floatingLabelText="Фамилия"
					value={lastName}
					onChange={this.onLastNameChange}
				/>

				<IconButton className={s.remove} onClick={onRemove}><IconDelete color="black"/></IconButton>

			</div>
		);
	}

}