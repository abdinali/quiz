import Options from './Options';

function Question({ question, dispatch, answer }) {
	const { question: questionText } = question;
	return (
		<div>
			<h4>{questionText}</h4>
			<Options question={question} dispatch={dispatch} answer={answer} />
		</div>
	);
}

export default Question;
