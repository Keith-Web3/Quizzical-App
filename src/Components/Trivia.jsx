import React from 'react'
import Questions from './Questions'
import { nanoid } from 'nanoid'

import '../CSS/questions.css'

export default function (props) {
  const [triviaState, setTriviaState] = React.useState(() => [])
  const [myState, setMyState] = React.useState(() => [])
  const [questionsArray, setQuestionsArray] = React.useState(() => [])
  const [hasEndedTrivia, setHasEndedTrivia] = React.useState(false)

  function updateScore(correctAnsId, ansId) {
    setMyState(prevVal => [...prevVal, [correctAnsId, ansId]])
  }
  function endTrivia() {
    setHasEndedTrivia(true)
  }
  function restartGame() {
    props.endTrivia()
    setHasEndedTrivia(false)
  }

  React.useEffect(() => {
    fetch(
      'https://opentdb.com/api.php?amount=20&category=27&difficulty=medium&type=multiple'
    )
      .then(res => res.json())
      .then(({ results }) => {
        setTriviaState(
          results.map(item => {
            const correctAnsId = nanoid()
            return {
              question: item.question,
              currAns: '',
              id: nanoid(),
              answers: [
                {
                  answer: item.correct_answer,
                  id: correctAnsId,
                },
                ...item.incorrect_answers.map(item => ({
                  answer: item,
                  id: nanoid(),
                })),
              ],
              correctAnsId,
              length: item.incorrect_answers.length + 1,
            }
          })
        )
      })
  }, [props.startTrivia])
  React.useEffect(() => {
    setQuestionsArray(
      triviaState.map((el, idx) => {
        return (
          <Questions
            obj={triviaState[idx]}
            key={nanoid()}
            updateScore={updateScore}
          />
        )
      })
    )
  }, [triviaState])
  const className = [hasEndedTrivia ? 'endedTrivia' : '', 'questions-container']
  return (
    <main className={className.join(' ')}>
      {questionsArray}
      <div className="footer">
        {hasEndedTrivia && (
          <p>
            You scored {myState.filter(item => item[0] === item[1]).length}/
            {triviaState.length} correct answers
          </p>
        )}
        <button
          className="checkAns"
          onClick={hasEndedTrivia ? restartGame : endTrivia}
        >
          {hasEndedTrivia ? 'Play again' : 'Check Answers'}
        </button>
      </div>
    </main>
  )
}
