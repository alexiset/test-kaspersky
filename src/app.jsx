import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as s from './css/common.scss';

import { Head } from './components/Head';

import { Detail } from './containers/Detail';
import { Add } from './containers/Add';
import { Edit } from './containers/Edit';
import { List } from './containers/List';

export class App extends Component {

	render() {
		return (
			<MuiThemeProvider>
				<div>
					<Router>
						<div>
							<Route path="/" component={Head} />

							<Route path="/add" component={Add} />

							<Switch>
								<Route path="/books/:id/edit" component={Edit} />
								<Route path="/books/:id" component={Detail} />
							</Switch>

							<Route path="/" component={List} />
						</div>
					</Router>
				</div>
			</MuiThemeProvider>
		);
	}
}