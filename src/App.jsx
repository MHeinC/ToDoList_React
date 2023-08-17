import { useState } from 'react'

function App() {
  const [inputData, setInputData] = useState("")
  const [toDoArray, setToDoArray] = useState([])

  function handleChange(e) {
    setInputData(prevData => {
      return e.target.value
  })}

  function handleClick(e) {
    e.preventDefault()
    if(!inputData === "") {
      setToDoArray(prevState => {
        return [...prevState, inputData]
      })
   }
  }

  return (
    <div>
      <h1>To Do List</h1>
      <form>
        <input
          value={inputData}
          type="text"
          name="newToDo"
          placeholder="Add new To Do"
          onChange={handleChange}
        />
        <button onClick={handleClick}>Add</button>
      </form>
      {
        toDoArray.map(item => {
          return (
            <div>
              <input
                type="checkbox"
              />
              <div>{item}</div>
            </div>
        )})
      }
    </div>
  )

}

export default App
