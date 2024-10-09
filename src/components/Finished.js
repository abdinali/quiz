function Finished({ dispatch, maxScore, score, highScore }) {
	const pct = (score / maxScore) * 100;

	let emoji;
	if (pct === 100.0) emoji = '🥇';
	if (pct >= 80.0 < 100.0) emoji = '🎖️';
	if (pct >= 50.0 < 80.0) emoji = '🎊';
	if (pct < 50) emoji = '🙁';

	function handleRestart() {
		dispatch({ type: 'restartQuiz' });
	}

	return (
		<>
			<p className="result">
				You scored <strong>{score}</strong> out of {maxScore} ({pct.toFixed(2)}%) {emoji}
			</p>
			<p className="highscore">Highscore: {highScore} points</p>
			<button className="btn btn-ui" onClick={handleRestart}>
				Restart
			</button>
		</>
	);
}

export default Finished;
