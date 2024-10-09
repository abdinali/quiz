function Progress({ index, numOfQuestions, score, maxScore, answer }) {
	return (
		<header className="progress">
			<progress max={numOfQuestions} value={index + Number(answer !== null)}></progress>
			<p>
				Question <strong>{index + 1}</strong> / {numOfQuestions}
			</p>
			<p>
				<strong>{score}</strong> / {maxScore}
			</p>
		</header>
	);
}

export default Progress;
