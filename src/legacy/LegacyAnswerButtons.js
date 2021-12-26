const AnswerButtons = ({
	correctAnswer,
	setFinalAnswerChoice,
	setCorrect,
	finalAnswerChoice,
	correct,
	getNewProblem,
	onCorrect,
	onWrong,
}) => {
	const [positiveSign, setPositiveSign] = useState(true);
	const [answerChoice, setAnswerChoice] = useState('');
	const [activeAnswer, setActiveAnswer] = useState('');

	// TO IMPLEMENT
	// Implement disabled states for answer choices
	// Implement toggle switch for positive or negative options

	useEffect(() => {
		createAnswer();
	}, [answerChoice, positiveSign]);

	// on new question, reset answer choice
	// on submit: combine questions and check if answre is correct
	const handleAnswerChoiceChange = (choice) => {
		setAnswerChoice(choice);
		// createAnswer()
		setActiveAnswer(choice);
		// handleSubmit()
	};

	const createAnswer = () => {
		if (positiveSign) {
			setFinalAnswerChoice(answerChoice);
		} else {
			// negative is chosen
			if (answerChoice == 'undefined') {
				setFinalAnswerChoice('undefined');
			} else if (answerChoice == '0') {
				setFinalAnswerChoice('0');
			} else {
				setFinalAnswerChoice('-' + answerChoice);
			}
		}
	};

	const handleSignChangeToPositive = () => {
		setPositiveSign(true);
	};

	const handleSignChangeToNegative = () => {
		setPositiveSign(false);
	};

	const handleAnswerChoiceChangeToRt2Over2 = () => {
		handleAnswerChoiceChange('√2/2');
	};
	const handleAnswerChoiceChangeToRt3Over2 = () => {
		handleAnswerChoiceChange('√3/2');
	};
	const handleAnswerChoiceChangeTo1Over2 = () => {
		handleAnswerChoiceChange('1/2');
	};
	const handleAnswerChoiceChangeTo1OverRt3 = () => {
		handleAnswerChoiceChange('1/√3');
	};
	const handleAnswerChoiceChangeToRt3 = () => {
		handleAnswerChoiceChange('√3');
	};
	const handleAnswerChoiceChangeTo1 = () => {
		handleAnswerChoiceChange('1');
	};
	const handleAnswerChoiceChangeTo0 = () => {
		handleAnswerChoiceChange('0');
	};
	const handleAnswerChoiceChangeToUndefined = () => {
		handleAnswerChoiceChange('undefined');
	};

	const handleSubmit = () => {
		if (finalAnswerChoice == correctAnswer) {
			setCorrect(true);
			onCorrect();
		} else {
			setCorrect(false);
			onWrong();
		}
		setFinalAnswerChoice('');
	};

	return (
		<div style={{ height: '70%', maxWidth: '50%', padding: '1em' }}>
			<Typography variant='h4'>
				Current Guess: {finalAnswerChoice}
			</Typography>

			<Button
				variant='contained'
				color='primary'
				onClick={handleSignChangeToPositive}
				disabled={positiveSign}
				style={{ fontSize: 20, width: '30%' }}
			>
				{' '}
				+{' '}
			</Button>
			<Button
				variant='contained'
				color='primary'
				onClick={handleSignChangeToNegative}
				disabled={!positiveSign}
				style={{ fontSize: 20, width: '30%' }}
			>
				{' '}
				-{' '}
			</Button>

			<br />

			{activeAnswer == '√2/2' && (
				<Button
					variant='contained'
					style={{ padding: 20, margin: '1em' }}
					onClick={handleAnswerChoiceChangeToRt2Over2}
					color='primary'
				>
					<StaticMathField style={{ fontSize: 40 }}>
						{'\\frac{\\sqrt{2}}{2}'}
					</StaticMathField>
				</Button>
			)}
			{activeAnswer !== '√2/2' && (
				<Button
					variant='outlined'
					style={{ padding: 20, margin: '1em' }}
					onClick={handleAnswerChoiceChangeToRt2Over2}
					color='inherit'
				>
					<StaticMathField style={{ fontSize: 40 }}>
						{'\\frac{\\sqrt{2}}{2}'}
					</StaticMathField>
				</Button>
			)}
			{activeAnswer == '√3/2' && (
				<Button
					variant='contained'
					style={{ padding: 20, margin: '1em' }}
					onClick={handleAnswerChoiceChangeToRt3Over2}
					color='primary'
				>
					<StaticMathField style={{ fontSize: 40 }}>
						{'\\frac{\\sqrt{3}}{2}'}
					</StaticMathField>
				</Button>
			)}
			{activeAnswer !== '√3/2' && (
				<Button
					variant='outlined'
					style={{ padding: 20, margin: '1em' }}
					onClick={handleAnswerChoiceChangeToRt3Over2}
					color='inherit'
				>
					<StaticMathField style={{ fontSize: 40 }}>
						{'\\frac{\\sqrt{3}}{2}'}
					</StaticMathField>
				</Button>
			)}
			{activeAnswer == '1/2' && (
				<Button
					variant='contained'
					style={{ padding: 20, margin: '1em' }}
					onClick={handleAnswerChoiceChangeTo1Over2}
					color='primary'
				>
					<StaticMathField style={{ fontSize: 40 }}>
						{'\\frac{1}{2}'}
					</StaticMathField>
				</Button>
			)}
			{activeAnswer !== '1/2' && (
				<Button
					variant='outlined'
					style={{ padding: 20, margin: '1em' }}
					onClick={handleAnswerChoiceChangeTo1Over2}
					color='inherit'
				>
					<StaticMathField style={{ fontSize: 40 }}>
						{'\\frac{1}{2}'}
					</StaticMathField>
				</Button>
			)}
			{activeAnswer == '1/√3' && (
				<Button
					variant='contained'
					style={{ padding: 20, margin: '1em' }}
					onClick={handleAnswerChoiceChangeTo1OverRt3}
					color='primary'
				>
					<StaticMathField style={{ fontSize: 40 }}>
						{'\\frac{1}{\\sqrt{3}}'}
					</StaticMathField>
				</Button>
			)}
			{activeAnswer !== '1/√3' && (
				<Button
					variant='outlined'
					style={{ padding: 20, margin: '1em' }}
					onClick={handleAnswerChoiceChangeTo1OverRt3}
					color='inherit'
				>
					<StaticMathField style={{ fontSize: 40 }}>
						{'\\frac{1}{\\sqrt{3}}'}
					</StaticMathField>
				</Button>
			)}
			{activeAnswer == '√3' && (
				<Button
					variant='contained'
					style={{ padding: 20, margin: '1em' }}
					onClick={handleAnswerChoiceChangeToRt3}
					color='primary'
				>
					<StaticMathField style={{ fontSize: 40 }}>
						{'\\sqrt{3}'}
					</StaticMathField>
				</Button>
			)}
			{activeAnswer !== '√3' && (
				<Button
					variant='outlined'
					style={{ padding: 20, margin: '1em' }}
					onClick={handleAnswerChoiceChangeToRt3}
					color='inherit'
				>
					<StaticMathField style={{ fontSize: 40 }}>
						{'\\sqrt{3}'}
					</StaticMathField>
				</Button>
			)}
			{activeAnswer == '1' && (
				<Button
					variant='contained'
					style={{ padding: 20, margin: '1em' }}
					onClick={handleAnswerChoiceChangeTo1}
					color='primary'
				>
					<StaticMathField style={{ fontSize: 40 }}>
						{'1'}
					</StaticMathField>
				</Button>
			)}
			{activeAnswer !== '1' && (
				<Button
					variant='outlined'
					style={{ padding: 20, margin: '1em' }}
					onClick={handleAnswerChoiceChangeTo1}
					color='inherit'
				>
					<StaticMathField style={{ fontSize: 40 }}>
						{'1'}
					</StaticMathField>
				</Button>
			)}
			{activeAnswer == '0' && (
				<Button
					variant='contained'
					style={{ padding: 20, margin: '1em' }}
					onClick={handleAnswerChoiceChangeTo0}
					color='primary'
				>
					<StaticMathField style={{ fontSize: 40 }}>
						{'0'}
					</StaticMathField>
				</Button>
			)}
			{activeAnswer !== '0' && (
				<Button
					variant='outlined'
					style={{ padding: 20, margin: '1em' }}
					onClick={handleAnswerChoiceChangeTo0}
					color='inherit'
				>
					<StaticMathField style={{ fontSize: 40 }}>
						{'0'}
					</StaticMathField>
				</Button>
			)}
			{activeAnswer == 'undefined' && (
				<Button
					variant='contained'
					style={{ padding: 20, margin: '1em' }}
					onClick={handleAnswerChoiceChangeToUndefined}
					color='primary'
				>
					<StaticMathField style={{ fontSize: 40 }}>
						{'undefined'}
					</StaticMathField>
				</Button>
			)}
			{activeAnswer !== 'undefined' && (
				<Button
					variant='outlined'
					style={{ padding: 20, margin: '1em' }}
					onClick={handleAnswerChoiceChangeToUndefined}
					color='inherit'
				>
					<StaticMathField style={{ fontSize: 40 }}>
						{'undefined'}
					</StaticMathField>
				</Button>
			)}

			<Button
				variant='contained'
				onClick={handleSubmit}
				size='large'
				color={
					correct
						? 'success'
						: correct === false
						? 'error'
						: 'primary'
				}
			>
				{correct === null && 'Check Work'}

				{correct === false && 'Incorrect'}

				{correct === true && 'Correct'}
			</Button>
			{(correct == true || correct == false) && (
				<Button variant='outlined' onClick={getNewProblem}>
					Next Question {'-->'}
				</Button>
			)}
		</div>
	);
};
