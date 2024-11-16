import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'
const App = () => {
  const [persons, setPersons] = useState([
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [textFilter, setTextFilter] = useState('')
  useEffect(() => {
    personsService.getAll()
      .then(response => setPersons(response.data))
  }, [])
  const showAll = Boolean(textFilter)
  const deletePerson = (id) => { 
    const personForDeletion = persons.filter(p => id === p.id)
    if (personForDeletion && window.confirm(`delete ${personForDeletion[0].name} ?`)) {
    personsService.deleteId(id)
    .then(() => {
      const newPersons = persons.filter(p => id !== p.id)
      setPersons(newPersons)
    })
  }  else return
  }

  const displayedPersons = !showAll ? persons : persons.filter((person) => person.name.toLowerCase().match(textFilter.toLowerCase()))
  const addRecord = (event) =>
  {
    event.preventDefault();
    const newPerson = {name: newName, number: newNumber}

    const person = persons.find(p => p.name === newName)
    if (person && window.confirm(`${person.name} already exists. Do you want to replace the old number with the new one?`)) {
    newPerson.id = person.id
    personsService.update(person.id, newPerson).then((response) => {
      setPersons(persons.map(p => p.id === newPerson.id ? response.data : p))
      setSuccessMessage(`Updated ${response.data.name}!`)
      setTimeout(() => setSuccessMessage(null), 2000
      )
      
    })
    .catch(() => {setErrorMessage(`${person.name} has already been deleted from server`)
    console.log('error!', errorMessage)})
      
    
    } else {personsService.create(newPerson)
      .then(response => {
        console.log('response', response);
        setPersons(persons.concat(response.data))
        setSuccessMessage(`Created ${response.data.name}!`)
        setTimeout(() => setSuccessMessage(null), 2000)
      })
      .catch(() => {
        alert('Error when adding!');
        ;
      })
      
      setNewName('')
      setNewNumber('')}
        
      
    
    
  }
  const handleNameChange = (event) =>
  {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>
  {
    setNewNumber(event.target.value)
  }
  const handleTextFilterChange = (event) =>
    {
      
      setTextFilter(event.target.value)
      
    }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} errorMessage={errorMessage}></Notification>
      <Filter onChange={handleTextFilterChange} value={textFilter}></Filter>
      <h2>Add a new</h2>
      <PersonForm onSubmit={addRecord} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} ></PersonForm>
      <h2>Numbers</h2>
      <Persons displayedPersons={displayedPersons} handleDeletePerson={deletePerson}></Persons>
    </div>
  )
}

export default App
