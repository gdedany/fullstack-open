const Total = (props) => {
    const parts = props.parts
    const total = parts.reduce((accumulator, i) => {return accumulator += i.exercises},0 )
    console.log('calculatedTotal', total)
    return (
      <div>
        <p><strong>total of {total} exercises</strong></p>
      </div>
    )
    }

export default Total