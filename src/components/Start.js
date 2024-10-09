function Start({ dispatch, numOfQuestions }) {
	function startQuiz() {
		dispatch({ type: 'startQuiz' });
	}
	return (
		<div className="start">
			<h2>Welcome to the React Quiz!</h2>
			<h3>{numOfQuestions} questions to test your react mastery</h3>
			<button className="btn btn-ui" onClick={startQuiz}>
				Let's Start
			</button>
		</div>
	);
}

export default Start;
