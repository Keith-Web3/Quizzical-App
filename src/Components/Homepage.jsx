import React from 'react'
import '../CSS/homepage.css'

export default function (props) {
  return (
    <main className="homepage">
      <h1>Quizzical</h1>
      <p>Some description if needed</p>
      <button onClick={props.startTrivia}>Start quiz</button>
    </main>
  )
}
