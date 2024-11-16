import Part from "./Part"
const Content = (props) =>{
    console.log(props.parts)
    return (
    <div>
        {props.parts.map((part, i) =>
            <Part key={i} name={part.name} exercises={part.exercises} />
        )}
    </div>
    )
  }

export default Content