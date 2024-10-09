import { useEffect } from 'react';

function Timer({ dispatch, secondsRemaining }) {
	const mins = Math.floor(secondsRemaining / 60);
	const secs = Math.floor(secondsRemaining % 60);
	const display_timer = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

	useEffect(
		function () {
			const id = setInterval(function () {
				dispatch({ type: 'tick' });
			}, 1000);

			return function () {
				clearInterval(id);
			};
		},
		[dispatch]
	);
	return <div className="timer">{display_timer}</div>;
}

export default Timer;
