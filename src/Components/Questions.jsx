import React from 'react'
import { nanoid } from 'nanoid'

export default function (props) {
  const [selected, setSelected] = React.useState(() => '')
  const [answersIdx, setAnswers] = React.useState(() => {
    console.log('rendered')
    let arr = []
    while (new Set(arr).size !== props.obj.length) {
      arr = [...arr, Math.floor(Math.random() * props.obj.length)]
    }
    return [...new Set(arr)]
  })

  function handleClick(id) {
    return () => {
      setSelected(prevVal => id)
      props.updateScore(props.obj.correctAnsId, id)
    }
  }
  const answers = [...props.obj.answers]
  function Answer({ answerObj: { answer, id } }) {
    const answerClass = [
      selected === id ? 'selected' : '',
      id === props.obj.correctAnsId ? 'correctAns' : '',
    ]
    return (
      <p onClick={handleClick(id)} className={answerClass.join(' ')}>
        {answer}
      </p>
    )
  }

  return (
    <div className="question">
      <p data-answer="">{props.obj.question}</p>
      <div className="answers">
        {answersIdx.map(idx => (
          <Answer answerObj={answers[idx]} key={nanoid()} />
        ))}
      </div>
      <hr color="#dbdef0" />
    </div>
  )
}
