import React, { Component, Fragment } from 'react';
import NavBar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
	state = {
		users: [],
		user: {},
		repos: [],
		loading: false,
		alert: null
	};

	async componentDidMount() {
		// this.setState({ loading: true });
		// const response = await axios.get(`https://api.github.com/users?
		// client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
		// client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}
		// `);

		// this.setState({ users: response.data, loading: false });
		this.searchUsers('francomac');
	}

	// Search Github Users
	searchUsers = async (text) => {
		this.setState({ loading: true });

		const response = await axios.get(
			`https://api.github.com/search/users?q=${text}&
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}
    `
		);

		this.setState({ users: response.data.items, loading: false });
	};

	// Get single Github User
	getUser = async (userName) => {
		this.setState({ loading: true });

		const response = await axios.get(
			`https://api.github.com/users/${userName}?
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}
    `
		);

		this.setState({ user: response.data, loading: false });
	};

	// Get User Repos
	getUserRepos = async (userName) => {
		this.setState({ loading: true });

		const response = await axios.get(
			`https://api.github.com/users/${userName}/repos?per_page=6&sort=created:asc&
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}
    `
		);

		this.setState({ repos: response.data, loading: false });
	};

	setAlert = (newMsg, newType) => {
		this.setState({ alert: { msg: newMsg, type: newType } });

		setTimeout(() => {
			this.setState({ alert: null });
		}, 3000);
	};

	clearUsers = () => {
		this.setState({ users: [], loading: false });
	};

	render() {
		const { users, user, repos, loading } = this.state;
		const name = 'francomac';
		const loadingTitle = false;
		const showName = true;

		return (
			<Router>
				<div className='App'>
					<NavBar title='Github Finder' />
					{loadingTitle ? <h4>Loading...</h4> : <h3>Hello {showName && name}!</h3>}
					<div className='container'>
						<Alert alert={this.state.alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={(props) => (
									<Fragment>
										<Search
											searchUsers={this.searchUsers}
											clearUsers={this.clearUsers}
											showClear={users.length > 0 ? true : false}
											setAlert={this.setAlert}
										/>
										<Users loading={loading} users={users} />
									</Fragment>
								)}
							/>
							<Route exact path='/about' component={About} />
							<Route
								exact
								path='/user/:login'
								render={(props) => (
									<User
										{...props}
										getUser={this.getUser}
										getUserRepos={this.getUserRepos}
										user={user}
										repos={repos}
										loading={loading}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
