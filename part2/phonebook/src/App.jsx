import { useEffect, useState } from 'react'
import PersonForm from './PersonForm'
import FilteredPerson from './FilteredPerson'
import Filter from './Filter'
import personServices from './services/persons'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filtered, setFiltered] = useState('')
  const [loading, setLoading] = useState(true)
  const [notify, setNotify] = useState(null)
  const [timer, setTimer] = useState(null)


  useEffect(() => {
    personServices.getAll().then(p => {
      setPersons(p)
      setLoading(false)
    })
    .catch(error => console.log(error))
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()
    
    const inps = {
      name: newName,
      number
    }

   
   if(newName.trim()){   
    if(!persons.some(person => person.name === inps.name)){
      personServices.create(inps)
      .then(p => {
          setPersons(persons.concat(p))
          if(timer){
            clearTimeout(timer)
          }
          setNotify({name: `Added ${inps.name}`, type: 'success'})

          setTimer(setTimeout(() => {
            setNotify(null)
          }, 3000))
      })
      .catch(error => {
        if(timer){
          clearTimeout(timer)
        }
        setNotify({name: `Error: Failed to add new name`, type: 'error'})
        setTimer(setTimeout(() => {
          setNotify(null)
        }, 3000))
        console.log(error)
      })
    
    
    }else {
      if(window.confirm(`${inps.name} is already added to phonebook, replace the old number with a new one?`)){
        const personSelected = persons.find(person => person.name === inps.name)
        const changeNo = {...personSelected, number: inps.number}
        personServices.update(personSelected.id, changeNo)
        .then(n => {
          setPersons(persons.map(person => person.id === personSelected.id ? n : person))
          if(timer){
            clearTimeout(timer)
          }
          setNotify({name: `Updated ${inps.name}`, type: 'success'})

          setTimer(setTimeout(() => {
            setNotify(null)
          }, 3000))
        })
        .catch(error => {
          if(timer){
            clearTimeout(timer)
          }
          setNotify({name: `Information of ${inps.name} has already been removed from server`, type: 'error'})

          setTimer(setTimeout(() => {
            setNotify(null)
          }, 3000))

          setPersons(persons.filter(e => e.id !== personSelected.id))
          console.log(error)
        })
      }
    }
  }
    setNewName('')
    setNumber('')
  }
  
  const filteredperson = persons.filter((element) => element.name && element.name.toLowerCase().includes(filtered.toLowerCase()))

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}`)){
      personServices.removeItem(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => console.log(error)
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {notify && <Notification message={notify} />}
      <Filter value={filtered} onChange={e => setFiltered(e.target.value)} />
      <h2>Add a new</h2>
      
      <PersonForm onSubmit={submitHandler} onChange1={(e) => setNewName(e.target.value)} onChange2={(e) => setNumber(e.target.value)} value1={newName} value2={number} />
      <h2>Numbers</h2>
      
      {loading ? 'loading' : <FilteredPerson filteredperson={filteredperson} onClick={deletePerson} />}
    </div>
  )
}

export default App