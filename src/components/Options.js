function Options({ question, dispatch, answer }) {
	const hasAnswered = answer !== null;

	function handleAnswer(index) {
		dispatch({ type: 'newAnswer', payload: index });
	}

	return (
		<div className="options">
			{question.options.map((option, index) => (
				<button
					className={`btn btn-option ${index === answer ? 'answer' : ''} ${
						hasAnswered ? (index === question.correctOption ? 'correct' : 'wrong') : ''
					}`}
					key={option}
					option={option}
					onClick={() => handleAnswer(index)}
					disabled={hasAnswered}
				>
					{option}
				</button>
			))}
		</div>
	);
}

export default Options;
