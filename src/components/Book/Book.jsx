import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import * as s from './Book.scss';

export class Book extends Component {

	render() {
		const {
			book
		} = this.props;
		const previewStyle = book.preview ? { backgroundImage: `url(${ book.preview })` } : null;

		return (
			<div className={s.block}>
				<Card className={s.preview}>
					<div className={s.previewPicture} style={previewStyle}></div>
				</Card>

				<div className={s.info}>

					<div className={s.title}>{book.title}</div>

					<div className={s.field}>
						<div className={s.fieldTitle}>Авторы:</div>
						<div className={s.fieldValue}>
							{book.authors && book.authors.map((author, ind) => {
								return (<div key={ind}>{author.firstName} {author.lastName}</div>);
							})}
						</div>
					</div>

					<div className={s.field}>
						<div className={s.fieldTitle}>Количество страниц:</div>
						<div className={s.fieldValue}>{book.pageCount}</div>
					</div>

					{ book.publisherName && (
						<div className={s.field}>
							<div className={s.fieldTitle}>Издатель:</div>
							<div className={s.fieldValue}>{book.publisherName}</div>
						</div>
					)}

					{ book.publicationYear && (
						<div className={s.field}>
							<div className={s.fieldTitle}>Год публикации:</div>
							<div className={s.fieldValue}>{book.publicationYear}</div>
						</div>
					)}

					{ book.circulation && (
						<div className={s.field}>
							<div className={s.fieldTitle}>Дата издания:</div>
							<div className={s.fieldValue}>{book.circulation}</div>
						</div>
					)}

					{ book.ISBN && (
						<div className={s.field}>
							<div className={s.fieldTitle}>ISBN:</div>
							<div className={s.fieldValue}>{book.ISBN}</div>
						</div>
					)}

					<div className={s.field}>
						<div className={s.fieldTitle}></div>
						<div className={s.fieldValue}></div>
					</div>

					<div className={s.field}>
						<div className={s.fieldTitle}></div>
						<div className={s.fieldValue}></div>
					</div>
				</div>
			</div>
		)
	}

}