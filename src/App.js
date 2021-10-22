import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import homeScreen from './screens/homeScreen';
import testScreen from './screens/testScreen';
import profileScreen from './screens/profileScreen';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/profile' component={profileScreen} />
				<Route path='/test' component={testScreen} />
				{/* <Route path='/signup' component={signUpScreen} /> */}
				<Route path='/learn' component={homeScreen} />
				<Route path='/' component={homeScreen} />
			</Switch>
		</Router>
	);
}

export default App;
