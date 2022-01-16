import { problemSet } from './problems';

const getProblem = (verifyProblem, setProblem, setCorrect) => {
	let random = problemSet[Math.floor(Math.random() * problemSet.length)];
	let verified = verifyProblem(random);
	while (!verified) {
		random = problemSet[Math.floor(Math.random() * problemSet.length)];
		verified = verifyProblem(random);
	}
	setProblem(random);
	setCorrect(null);
};

export { getProblem };
