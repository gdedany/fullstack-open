const Filter = (props) => {
    console.log(props.value)
    return (
      <div>filter shown with <input value={props.value} onChange={props.onChange}/></div>

    )
}
export default Filter