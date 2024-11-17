const Persons = (props) => {
    return <div>
        {props.displayedPersons.map((person) =><div key={person.name}> <span>{person.name} {person.number}</span> <button onClick={() => props.handleDeletePerson(person.id)}>DELETE</button></div>)}
    </div>
}
export default Persons