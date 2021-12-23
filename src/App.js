import React, { useState } from 'react';

import HomeScreen from './screens/HomeScreen';
import TestScreen from './screens/TestScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignUpScreen from './screens/SignUpScreen';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from './firebase';
import Nav from './components/Nav';

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
					<Route path='/' component={HomeScreen} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
