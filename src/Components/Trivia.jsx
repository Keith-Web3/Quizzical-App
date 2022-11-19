import React from 'react'
import Questions from './Questions'
import { nanoid } from 'nanoid'

import '../CSS/questions.css'

export default function (props) {
  const [questionsArray, setQuestionsArray] = React.useState(() => [])
  const [questionsState, setQuestionsState] = React.useState(() => [])

  function pickRandom(arr, length) {
    const ans = arr.splice(Math.round(Math.random() * length) - 1, 1)[0]
    return [ans.answer, ans.id]
  }
  function handleClick(quesId, ansId) {
    return () => {
      setQuestionsState(prevVal =>
        prevVal.map(item => {
          if (item.id !== quesId) return item
          console.log(quesId, item.id)
          return {
            ...item,
            chosenAns: ansId,
          }
        })
      )
    }
  }
  React.useEffect(() => {
    fetch(
      'https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple'
    )
      .then(res => res.json())
      .then(({ results }) => {
        setQuestionsState(
          results.map(el => {
            return {
              ...el,
              id: nanoid(),
              chosenAns: '',
            }
          })
        )
      })
      .then(() => {
        setQuestionsArray(
          questionsState.map(el => {
            const answersArr = [
              {
                answer: el.correct_answer,
                id: nanoid(),
              },
              ...el.incorrect_answers.map(el => ({
                answer: el,
                id: nanoid(),
              })),
            ]
            return (
              <Questions
                handler={handleClick}
                key={el.id}
                id={el.id}
                question={[el.question, answersArr[0].id]}
                answer1={pickRandom(answersArr, answersArr.length)}
                answer2={pickRandom(answersArr, answersArr.length)}
                answer3={pickRandom(answersArr, answersArr.length)}
                answer4={pickRandom(answersArr, answersArr.length)}
              />
            )
          })
        )
      })
  }, [props.startTrivia])
  return (
    <main
      className="questions-container"
      style={{
        display: props.startTrivia ? 'block' : 'none',
      }}
    >
      {questionsArray}
    </main>
  )
}
