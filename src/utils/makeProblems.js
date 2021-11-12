import { findAnswer } from './findAnswer';

const degrees = [
	0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330,
	360,
];

// option + v for √

const printInfo = (feature) => {
	console.log(`
    {
        'name':  '${feature.name}',
        'type': '${feature.type}',
        'answer': '${feature.answer}',
        'quadrant': ${feature.quadrant},
        'degree': ${feature.degree}
    },
    `);
};

for (let i = 0; i < degrees.length; i++) {
	// for every degree
	const features = {
		name: '',
		type: '',
		answer: '',
		quadrant: 0,
		degree: 0,
		radians: '',
	};

	// for sin
	features.name = 'sin' + degrees[i].toString();
	features.type = 'sin';
	features.answer = findAnswer(
		Math.sin((degrees[i] * Math.PI) / 180).toFixed(2)
	);
	features.quadrant = Math.round((degrees[i] + 30) / 90); // fix
	features.degree = degrees[i];
	printInfo(features);

	// for cos
	features.name = 'cos' + degrees[i].toString();
	features.type = 'cos';
	features.answer = findAnswer(
		Math.cos((degrees[i] * Math.PI) / 180).toFixed(2)
	);
	features.quadrant = Math.round((degrees[i] + 30) / 90); // fix
	features.degree = degrees[i];
	printInfo(features);

	features.name = 'tan' + degrees[i].toString();
	features.type = 'tan';
	features.answer = findAnswer(
		Math.tan((degrees[i] * Math.PI) / 180).toFixed(2)
	);
	features.quadrant = Math.round((degrees[i] + 30) / 90); // fix
	features.degree = degrees[i];
	printInfo(features);
}
