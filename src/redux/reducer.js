import { combineReducers } from 'redux';

const questionsReducer = (state = [], action) => {
	switch (action.type) {
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	questions: questionsReducer,
});

export default rootReducer;
