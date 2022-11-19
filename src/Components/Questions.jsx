import React from 'react'

export default function (props) {
  const [selected, setSelected] = React.useState(() => '')

  function Answer({ answer, id }) {
    function handleClick(id) {
      return () => {
        setSelected(id)
        selected === id ? props.question[2](prevVal => prevVal + 1) : 0
        props.handler(props.id, id)
      }
    }
    return (
      <p
        className={selected === id ? 'selected' : null}
        onClick={handleClick(id)}
      >
        {answer}
      </p>
    )
  }

  return (
    <div className="question">
      <p>{props.question[0]}</p>
      <div className="answers">
        <Answer answer={props.answer1[0]} id={props.answer1[1]} />
        <Answer answer={props.answer2[0]} id={props.answer2[1]} />
        <Answer answer={props.answer3[0]} id={props.answer3[1]} />
        <Answer answer={props.answer4[0]} id={props.answer4[1]} />
      </div>
      <hr color="#dbdef0" />
    </div>
  )
}
