import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [topAnecdote, setTopAnecdote] = useState(0)
  const [points, setPoints] = useState(
    Array(anecdotes.length).fill(0))
  const handleNext = () =>{
    const nextAnecdote = Math.floor(Math.random() * 8);
    setSelected(nextAnecdote)
  }
  const handleVote = () =>{
    let copy = {...points}
    copy[selected] += 1
    setPoints(copy)
    let maxKey = Object.keys(copy)[0];
    for (const key in copy) {
      if (copy[key] > copy[maxKey]) {
        maxKey = key;
      }
    }
    setTopAnecdote(maxKey)
  }
  
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br />
      has {points[selected] || 0} points
      <br />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      {anecdotes[topAnecdote]}
      <br />
      has {points[topAnecdote] || 0} points

    </div>
  )
}

export default App