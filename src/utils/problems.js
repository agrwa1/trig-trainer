/*
    {
        name: (sin30, cos45, ...),
        type: (sin, cos, tan, sec, csc, cot),
        answer: (1/2, √3/2, √2/2, ...),
        quadrant: (1, 2, 3, 4),
        degree: (0, 30, 45, 60, 90, ...)
    }
*/

export const problemSet = [
	{
		name: 'sin0',
		type: 'sin',
		answer: '0',
		quadrant: 1,
		degree: 0,
	},

	{
		name: 'cos0',
		type: 'cos',
		answer: '1',
		quadrant: 1,
		degree: 0,
	},

	{
		name: 'tan0',
		type: 'tan',
		answer: '0',
		quadrant: 1,
		degree: 0,
	},

	{
		name: 'sin30',
		type: 'sin',
		answer: '1/2',
		quadrant: 1,
		degree: 30,
	},

	{
		name: 'cos30',
		type: 'cos',
		answer: '√3/2',
		quadrant: 1,
		degree: 30,
	},

	{
		name: 'tan30',
		type: 'tan',
		answer: '1/√3',
		quadrant: 1,
		degree: 30,
	},

	{
		name: 'sin45',
		type: 'sin',
		answer: '√2/2',
		quadrant: 1,
		degree: 45,
	},

	{
		name: 'cos45',
		type: 'cos',
		answer: '√2/2',
		quadrant: 1,
		degree: 45,
	},

	{
		name: 'tan45',
		type: 'tan',
		answer: '1',
		quadrant: 1,
		degree: 45,
	},

	{
		name: 'sin60',
		type: 'sin',
		answer: '√3/2',
		quadrant: 1,
		degree: 60,
	},

	{
		name: 'cos60',
		type: 'cos',
		answer: '1/2',
		quadrant: 1,
		degree: 60,
	},

	{
		name: 'tan60',
		type: 'tan',
		answer: '√3',
		quadrant: 1,
		degree: 60,
	},

	{
		name: 'sin90',
		type: 'sin',
		answer: '1',
		quadrant: 1,
		degree: 90,
	},

	{
		name: 'cos90',
		type: 'cos',
		answer: '0',
		quadrant: 1,
		degree: 90,
	},

	{
		name: 'tan90',
		type: 'tan',
		answer: 'undefined',
		quadrant: 1,
		degree: 90,
	},

	{
		name: 'sin120',
		type: 'sin',
		answer: '√3/2',
		quadrant: 2,
		degree: 120,
	},

	{
		name: 'cos120',
		type: 'cos',
		answer: '-1/2',
		quadrant: 2,
		degree: 120,
	},

	{
		name: 'tan120',
		type: 'tan',
		answer: '-√3',
		quadrant: 2,
		degree: 120,
	},

	{
		name: 'sin135',
		type: 'sin',
		answer: '√2/2',
		quadrant: 2,
		degree: 135,
	},

	{
		name: 'cos135',
		type: 'cos',
		answer: '-√2/2',
		quadrant: 2,
		degree: 135,
	},

	{
		name: 'tan135',
		type: 'tan',
		answer: '-1',
		quadrant: 2,
		degree: 135,
	},

	{
		name: 'sin150',
		type: 'sin',
		answer: '1/2',
		quadrant: 2,
		degree: 150,
	},

	{
		name: 'cos150',
		type: 'cos',
		answer: '-√3/2',
		quadrant: 2,
		degree: 150,
	},

	{
		name: 'tan150',
		type: 'tan',
		answer: '-1/√3',
		quadrant: 2,
		degree: 150,
	},

	{
		name: 'sin180',
		type: 'sin',
		answer: '0',
		quadrant: 2,
		degree: 180,
	},

	{
		name: 'cos180',
		type: 'cos',
		answer: '-1',
		quadrant: 2,
		degree: 180,
	},

	{
		name: 'tan180',
		type: 'tan',
		answer: '0',
		quadrant: 2,
		degree: 180,
	},

	{
		name: 'sin210',
		type: 'sin',
		answer: '-1/2',
		quadrant: 3,
		degree: 210,
	},

	{
		name: 'cos210',
		type: 'cos',
		answer: '-√3/2',
		quadrant: 3,
		degree: 210,
	},

	{
		name: 'tan210',
		type: 'tan',
		answer: '1/√3',
		quadrant: 3,
		degree: 210,
	},

	{
		name: 'sin225',
		type: 'sin',
		answer: '-√2/2',
		quadrant: 3,
		degree: 225,
	},

	{
		name: 'cos225',
		type: 'cos',
		answer: '-√2/2',
		quadrant: 3,
		degree: 225,
	},

	{
		name: 'tan225',
		type: 'tan',
		answer: '1',
		quadrant: 3,
		degree: 225,
	},

	{
		name: 'sin240',
		type: 'sin',
		answer: '-√3/2',
		quadrant: 3,
		degree: 240,
	},

	{
		name: 'cos240',
		type: 'cos',
		answer: '-1/2',
		quadrant: 3,
		degree: 240,
	},

	{
		name: 'tan240',
		type: 'tan',
		answer: '√3',
		quadrant: 3,
		degree: 240,
	},

	{
		name: 'sin270',
		type: 'sin',
		answer: '-1',
		quadrant: 3,
		degree: 270,
	},

	{
		name: 'cos270',
		type: 'cos',
		answer: '0',
		quadrant: 3,
		degree: 270,
	},

	{
		name: 'tan270',
		type: 'tan',
		answer: 'undefined',
		quadrant: 3,
		degree: 270,
	},

	{
		name: 'sin300',
		type: 'sin',
		answer: '-√3/2',
		quadrant: 4,
		degree: 300,
	},

	{
		name: 'cos300',
		type: 'cos',
		answer: '1/2',
		quadrant: 4,
		degree: 300,
	},

	{
		name: 'tan300',
		type: 'tan',
		answer: '-√3',
		quadrant: 4,
		degree: 300,
	},

	{
		name: 'sin315',
		type: 'sin',
		answer: '-√2/2',
		quadrant: 4,
		degree: 315,
	},

	{
		name: 'cos315',
		type: 'cos',
		answer: '√2/2',
		quadrant: 4,
		degree: 315,
	},

	{
		name: 'tan315',
		type: 'tan',
		answer: '-1',
		quadrant: 4,
		degree: 315,
	},

	{
		name: 'sin330',
		type: 'sin',
		answer: '-1/2',
		quadrant: 4,
		degree: 330,
	},

	{
		name: 'cos330',
		type: 'cos',
		answer: '√3/2',
		quadrant: 4,
		degree: 330,
	},

	{
		name: 'tan330',
		type: 'tan',
		answer: '-1/√3',
		quadrant: 4,
		degree: 330,
	},

	{
		name: 'sin360',
		type: 'sin',
		answer: '0',
		quadrant: 4,
		degree: 360,
	},

	{
		name: 'cos360',
		type: 'cos',
		answer: '1',
		quadrant: 4,
		degree: 360,
	},

	{
		name: 'tan360',
		type: 'tan',
		answer: '0',
		quadrant: 4,
		degree: 360,
	},
];

console.log(problemSet[Math.floor(Math.random() * problemSet.length)]);
