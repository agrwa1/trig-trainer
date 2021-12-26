const identifyAngles = (angle) => {
	let answer;
	switch (angle) {
		case 0:
			answer = '0';
			break;
		case 30:
			answer = 'π/6';
			break;
		case 45:
			answer = 'π/4';
			break;
		case 60:
			answer = 'π/3';
		case 90:
			answer = 'π/2';
			break;
		case 120:
			answer = '2π/3';
			break;
		case 135:
			answer = '3π/4';
			break;
		case 150:
			answer = '5π/6';
			break;
		case 180:
			answer = 'π';
			break;
		case 210:
			answer = '7π/6';
			break;
		case 225:
			answer = '5π/4';
			break;
		case 240:
			answer = '4π/3';
			break;
		case 270:
			answer = '3π/2';
			break;
		case 300:
			answer = '5π/3';
			break;
		case 315:
			answer = '7π/4';
			break;
		case 330:
			answer = '11π/6';
			break;
		case 360:
			answer = '2π';
			break;
		default:
			answer = 'def';
			break;
	}
	return answer;
};

export default identifyAngles;
