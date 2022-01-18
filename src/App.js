import React from 'react';

import HomeScreen from './screens/HomeScreen';
import TestScreen from './screens/TestScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignUpScreen from './screens/SignUpScreen';
import TeacherOverviewScreen from './screens/TeacherOverviewScreen';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import Nav from './components/Nav';

import './css/styles.css';

function App() {
	return (
		<>
			<Router>
				<Nav />
				<Switch>
					<Route path='/profile' component={ProfileScreen} />
					<Route path='/test' component={TestScreen} />
					<Route path='/signup' component={SignUpScreen} />
					<Route path='/learn'>
						<Redirect to='/' />
					</Route>
					<Route path='/overview' component={TeacherOverviewScreen} />
					<Route path='/' component={HomeScreen}>
						<Redirect to='/test' />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
