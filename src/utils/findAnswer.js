export const findAnswer = (decimalAnswer) => {
	//currently checks sin, cos values for all values
	let answer;
	if (decimalAnswer > 100) {
		return 'undefined';
	}
	switch (Math.abs(decimalAnswer)) {
		case 0:
			answer = '0';
			break;
		case 0.5:
			answer = '1/2';
			break;
		case 0.71:
			answer = '√2/2';
			break;
		case 0.87:
			answer = '√3/2';
			break;
		case 1:
			answer = '1';
			break;
		case 0.58:
			answer = '1/√3';
			break;
		case 1.73:
			answer = '√3';
			break;

		default:
			return 'undefined';
	}

	if (decimalAnswer < 0) {
		// if answer is negative
		// do this at the end at multiply answer by -1
		answer = '-' + answer;
	}
	return answer;
};
