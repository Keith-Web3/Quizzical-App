import React from 'react'
import reactLogo from './assets/react.svg'
import Homepage from './Components/Homepage'
import Trivia from './Components/Trivia'

function App() {
  const [startedTrivia, setStartedTrivia] = React.useState(false)
  const [answers, setAnswers] = React.useState([])
  function startTrivia() {
    setStartedTrivia(true)
  }
  function endTrivia() {
    setStartedTrivia(false)
  }
  function updateAnswers(id) {
    setAnswers(prevVal => [...prevVal, id])
  }

  return (
    <>
      {!startedTrivia && <Homepage startTrivia={startTrivia} />}
      {startedTrivia && (
        <Trivia
          startTrivia={startedTrivia}
          answers={updateAnswers}
          endTrivia={endTrivia}
        />
      )}
    </>
  )
}

export default App
