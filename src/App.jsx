import React from 'react'
import reactLogo from './assets/react.svg'
import Homepage from './Components/Homepage'
import Trivia from './Components/Trivia'

function App() {
  const [startedTrivia, setStartedTrivia] = React.useState(false)
  function startTrivia() {
    setStartedTrivia(true)
  }
  return (
    <>
      {!startedTrivia && <Homepage startTrivia={startTrivia} />}
      <Trivia startTrivia={startedTrivia} />
    </>
  )
}

export default App
