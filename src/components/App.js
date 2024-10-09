import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import Start from './Start';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import Finished from './Finished';
import Footer from './Footer';
import Timer from './Timer';

const initialState = {
	questions: [],
	status: 'loading', // loading, error, ready, active, or finished
	index: 0,
	answer: null,
	score: 0,
	highScore: 0,
	secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

function reducer(state, action) {
	switch (action.type) {
		case 'dataReceived':
			return { ...state, questions: action.payload, status: 'ready' };
		case 'dataFailed':
			return { ...state, status: 'error' };
		case 'startQuiz':
			return {
				...state,
				status: 'active',
				secondsRemaining: state.questions.length * SECS_PER_QUESTION,
			};
		case 'newAnswer':
			const question = state.questions.at(state.index);
			return {
				...state,
				answer: action.payload,
				score:
					action.payload === question.correctOption
						? state.score + question.points
						: state.score,
			};
		case 'nextQuestion':
			return { ...state, index: state.index + 1, answer: null };
		case 'finishQuiz':
			return {
				...state,
				status: 'finished',
				highScore: state.highScore < state.score ? state.score : state.highScore,
			};
		case 'restartQuiz':
			return {
				...initialState,
				questions: state.questions,
				highScore: state.highScore,
				status: 'ready',
			};
		case 'tick':
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status: state.secondsRemaining === 0 ? 'finished' : state.status,
			};
		default:
			throw new Error('Action unknown.');
	}
}

export default function App() {
	const [{ questions, answer, status, index, score, highScore, secondsRemaining }, dispatch] =
		useReducer(reducer, initialState);

	const numOfQuestions = questions.length;
	const maxScore = questions?.reduce((acc, question) => acc + question.points, 0);

	useEffect(function () {
		async function fetchQuestions() {
			try {
				const res = await fetch('http://localhost:8001/questions');
				const data = await res.json();
				if (data) dispatch({ type: 'dataReceived', payload: data });
			} catch (error) {
				console.log(error);
				dispatch({ type: 'dataFailed' });
			}
		}
		fetchQuestions();
	}, []);

	return (
		<div className="app">
			<Header />
			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && (
					<Start numOfQuestions={numOfQuestions} dispatch={dispatch} />
				)}
				{status === 'active' && (
					<>
						<Progress
							score={score}
							maxScore={maxScore}
							index={index}
							numOfQuestions={numOfQuestions}
							answer={answer}
						/>
						<Question question={questions[index]} answer={answer} dispatch={dispatch} />
						<Footer>
							<Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
							<NextButton
								dispatch={dispatch}
								index={index}
								answer={answer}
								numOfQuestions={numOfQuestions}
							/>
						</Footer>
					</>
				)}
				{status === 'finished' && (
					<Finished
						dispatch={dispatch}
						score={score}
						maxScore={maxScore}
						highScore={highScore}
					/>
				)}
			</Main>
		</div>
	);
}
