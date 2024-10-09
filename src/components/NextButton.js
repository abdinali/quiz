function NextButton({ dispatch, index, numOfQuestions, answer }) {
	if (answer === null) return null;

	function handleNextQuestion() {
		dispatch({ type: 'nextQuestion' });
	}

	function handleFinish() {
		dispatch({ type: 'finishQuiz' });
	}

	if (index < numOfQuestions - 1)
		return (
			<button className="btn btn-ui" onClick={handleNextQuestion}>
				Next
			</button>
		);

	if (index === numOfQuestions - 1) {
		return (
			<button className="btn btn-ui" onClick={handleFinish}>
				Finish
			</button>
		);
	}
}

export default NextButton;
