import { useState } from 'react'
const Button = ({clickHandler, label}) => {
  return <button onClick={clickHandler}>{label}</button>
}
const StatisticLine = ({label, count }) => {
  return <tr><td>{label}</td><td>{count}</td></tr>
}
const Statistics = ({ good, neutral, bad }) => {
  
  const totalCount = good + neutral + bad
  if (totalCount == 0 || !totalCount) {
    return 'no feedback given'
  }
  const average = (totalCount, good, neutral, bad) => {
    return (good/totalCount - bad/totalCount).toFixed(2)
  }
  const positive = (totalCount, good) => {

    return (good/totalCount).toFixed(2)
  }
  return <div>
    <table>
      <tbody>
      <StatisticLine label="good" count={good}/>
      <StatisticLine label="neutral" count={neutral}/>
      <StatisticLine label="bad" count={bad}/><StatisticLine label="average" count={average(totalCount,good,neutral,bad)}/>
      <StatisticLine label="positive" count={positive(totalCount, good) + '%'} />
      </tbody>
  </table>
  </div>
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => {
    setGood((prevGood) => prevGood+1
    )
  } 

  const handleNeutralFeedback = () => {
    setNeutral((prevNeutral) => prevNeutral+1)
  }
  const handleBadFeedback = () => {
    setBad((prevBad) => prevBad+1)
  }
  return (
    <div>
      <h2>give feedback</h2>
      <Button clickHandler={handleGoodFeedback} label="good"/>
      <Button clickHandler={handleNeutralFeedback} label="neutral"/>
      <Button clickHandler={handleBadFeedback} label="bad"/>
      <h2>statistics</h2>

  
      <Statistics good={good} neutral={neutral} bad={bad} />


    </div>
  )
}

export default App