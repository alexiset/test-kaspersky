import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconContentAdd from 'material-ui/svg-icons/content/add';
import CONST from '../../constants';
import { AuthorInput } from '../AuthorInput';
import * as s from './Form.scss';


export class Form extends Component {

	state = {
		title: this.props.title || '',
		pageCount: this.props.pageCount,
		publisherName: this.props.publisherName || '',
		publicationYear: this.props.publicationYear || '',
		ISBN: this.props.ISBN || '',
		circulation: this.props.circulation || '',
		preview: this.props.preview || null,
		authors: this.props.authors || [{ firstName: '', lastName: '' }],
		isTitleError: false,
		isPageCountError: false,
		isPublicationYearError: false,
		isISBNError: false,
		isCirculationError: false,
		id: this.props.id || ''
	};

	componentDidMount() {
		if (this.props.onMount) {
			this.props.onMount({
				onSubmit: this.onSubmit
			});
		}
	}

	isValidCirculation() {
		const date = this.state.circulation;
		const arDate = date.split('.');
		const time = new Date(arDate[2], arDate[1] - 1, arDate[0]).getTime();
		const startTime = new Date(CONST.MIN_PUBLICATION_YEAR, 0, 1).getTime();

		return !date || /^(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}$/.test(date) && time >= startTime;
	}

	isValidPublicationYear() {
		const year = this.state.publicationYear;

		return !year || Number(year) >= CONST.MIN_PUBLICATION_YEAR;
	}

	isValidTitle = () => {
		return this.state.title.length > 0 && this.state.title.length <= CONST.MAX_TITLE_LENGTH;
	};

	isValidPageCount = () => {
		const pageCount = Number(this.state.pageCount);

		return pageCount > 0 && pageCount <= CONST.MAX_PAGE_COUNT;
	};

	isValidISBN(isbn) {
		return !isbn || /(978||979)(-|\ )(\d{1,5})(-|\ )(\d{1,8})(-|\ )(\d{1,6})(-|\ )(\d)/.test(isbn);
	}

	isValidAuthors() {
		let isValid = true;

		this.state.authors.forEach((author) => {
			const isValidFirstName = author.firstName && author.firstName.length > 0 && author.firstName.length <= CONST.MAX_AUTHOR_FIRST_NAME_LENGTH;
			const isValidLastName = author.lastName && author.lastName.length > 0 && author.lastName.length <= CONST.MAX_AUTHOR_LAST_NAME_LENGTH;

			if (!isValidFirstName || !isValidLastName) {
				isValid = false;
			}
		});

		return isValid && this.state.authors.length > 0;
	};

	getBase64 = async (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = reject;
		});
	};

	generateId = () => {
		return Math.round(Math.random() * 10000000);
	};

	onTitleChange = (event) => {
		this.setState({
			title: event.target.value.trim(),
			isTitleError: false
		});
	};

	onPageCountChange = (event) => {
		this.setState({
			pageCount: event.target.value.trim(),
			isPageCountError: false
		});
	};

	onPublisherNameChange = (event) => {
		this.setState({
			publisherName: event.target.value.trim()
		});
	};

	onPublicationYearChange = (event) => {
		this.setState({
			publicationYear: event.target.value.trim(),
			isPublicationYearError: false
		});
	};

	onСirculationChange = (event) => {
		this.setState({
			circulation: event.target.value.trim(),
			isCirculationError: false
		});
	};

	onISBNChange = (event) => {
		this.setState({
			ISBN: event.target.value.trim(),
			isISBNError: false
		});
	};

	onPreviewChange = async (event) => {
		const file = event.target.files[0];
		const preview = await this.getBase64(file);

		this.setState({
			preview
		});
	};

	onAuthorChange = (changedIndex, author) => {
		const authors = this.state.authors.map((item, index) => {
			return changedIndex === index ? author : item;
		});

		this.setState({
			authors,
			isAuthorsError: false
		});
	};

	onAuthoreRemove = (removedIndex) => {
		let authors = this.state.authors.filter((item, index) => {
			return removedIndex !== index;
		});

		if (authors.length === 0) {
			authors = [{
				id: Math.random() * 100000000,
				firstName: '',
				lastName: ''
			}];
		}

		this.setState({
			authors,
			isAuthorsError: false
		});
	};

	onAddAuthorsClick = (event) => {
		event.preventDefault();

		this.setState({
			authors: this.state.authors.concat({
				id: Math.random() * 100000000,
				firstName: '',
				lastName: ''
			})
		});
	};

	onSubmit = () => {
		event.preventDefault();

		const isValidTitle = this.isValidTitle();
		const isValidPageCount = this.isValidPageCount();
		const isValidPublicationYear = this.isValidPublicationYear();
		const isValidCirculation = this.isValidCirculation();
		const isValidISBN = this.isValidISBN(this.state.ISBN);
		const isValidAuthors = this.isValidAuthors();

		const book = {
			id: this.state.id || this.generateId(),
			title: this.state.title,
			pageCount: this.state.pageCount,
			publisherName: this.state.publisherName,
			publicationYear: this.state.publicationYear,
			preview: this.state.preview,
			ISBN: this.state.ISBN,
			circulation: this.state.circulation,
			authors: this.state.authors
		};

		this.setState({
			isTitleError: !isValidTitle,
			isPageCountError: !isValidPageCount,
			isPublicationYearError: !isValidPublicationYear,
			isCirculationError: !isValidCirculation,
			isISBNError: !isValidISBN,
			isAuthorsError: !isValidAuthors,
		});

		if (
			isValidTitle &&
			isValidPageCount &&
			isValidPublicationYear &&
			isValidCirculation &&
			isValidISBN &&
			isValidAuthors
		) {
			this.props.onSubmit(book);
		}
	};

	render() {
		const {
			title,
			isTitleError,
			authors,
			isPageCountError,
			pageCount,
			publisherName,
			isPublicationYearError,
			publicationYear,
			isCirculationError,
			circulation,
			isISBNError,
			isAuthorsError,
			ISBN,
			preview
		} = this.state;

		return (
			<div className={s.block}>

				<form>
					<fieldset className={s.fields}>
						<dl>
							<TextField
								className={s.input}
								floatingLabelText="Заголовок"
								errorText={isTitleError ? 'Это поле заполнено некорректно' : null}
								value={title}
								onChange={this.onTitleChange}
							/>
						</dl>

						<dl className={s.authorsRow}>
							<dt>Авторы</dt>
							<dd className={s.authors}>
								{
									authors.map((item, index) => {
										return (
											<AuthorInput
												key={`${index}${item.id}`}
												id={item.id}
												firstName={item.firstName}
												lastName={item.lastName}
												onChange={(author) => this.onAuthorChange(index, author)}
												onRemove={() => this.onAuthoreRemove(index)}
											/>
										);
									})
								}

								{isAuthorsError && <div className={s.authorsError}>Это поле заполнено некорректно</div>}

								<FloatingActionButton
									className={s.authorsAdd}
									secondary={true}
									mini={true}
									onClick={this.onAddAuthorsClick}
								>
									<IconContentAdd/>
								</FloatingActionButton>
							</dd>
						</dl>

						<dl>
							<TextField
								className={s.input}
								floatingLabelText="Количество страниц"
								errorText={isPageCountError ? 'Это поле заполнено некорректно' : null}
								value={pageCount}
								onChange={this.onPageCountChange}
							/>
						</dl>

						<dl>
							<TextField
								className={s.input}
								floatingLabelText="Название издательства"
								value={publisherName}
								onChange={this.onPublisherNameChange}
							/>
						</dl>

						<dl>
							<TextField
								className={s.input}
								floatingLabelText="Год публикации"
								errorText={isPublicationYearError ? 'Неправильно указан год публикации' : null}
								value={publicationYear}
								onChange={this.onPublicationYearChange}
							/>
						</dl>

						<dl>
							<TextField
								className={s.input}
								floatingLabelText="Дата выхода в тираж"
								errorText={isCirculationError ? 'Неправильно указана дата' : null}
								value={circulation}
								onChange={this.onСirculationChange}
							/>
						</dl>

						<dl>
							<TextField
								className={s.input}
								floatingLabelText="ISBN"
								errorText={isISBNError ? 'Неправильно заполнен ISBN' : null}
								value={ISBN}
								onChange={this.onISBNChange}
							/>
						</dl>

						<dl>
							<div className={s.preview}>
								<div className={s.previewPicture} style={{ backgroundImage: `url(${ preview })` }}></div>

								<RaisedButton
									className={s.previewButton}
									label="Выбрать обложку"
									labelPosition="before"
									containerElement="label"
								>
									<input type="file" className={s.previewFile} onChange={this.onPreviewChange} />
								</RaisedButton>
							</div>
						</dl>
					</fieldset>
				</form>
			</div>
		);
	}
}