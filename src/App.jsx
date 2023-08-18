import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [inputData, setInputData] = useState("")
  const [toDoArray, setToDoArray] = useState([])

  function handleChange(e) {
    setInputData(() => {
      return e.target.value
    }
  )}

  function handleClick(e) {
    e.preventDefault()
    if(inputData.length > 0) {
      setToDoArray(prevState => {
       return [...prevState, {
        id: uuidv4(),
        text: inputData
       }]
      })
      setInputData(() => "")
    }
  }

  function handleDelete(e) {
    const clickedToDo = e.target.id
    console.log(clickedToDo)

    const filterArray = toDoArray.filter(item => {
      if(item.id !== clickedToDo) {
        return true
      }
      return false
    })

    setToDoArray(filterArray)

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
        <button onClick={handleClick}><i className="fa-solid fa-plus"></i></button>
      </form>
      {
        toDoArray.map(item => {
          return (
            <div key={uuidv4()} className="todo-container">
              <div className="todo">
                  <input
                    key={uuidv4()}
                    type="checkbox"
                  />
                  {item.text}
              </div>
              <div className="function-icons">
                <i className="fa-regular fa-pen-to-square"></i>
                <i className="fa-solid fa-trash-can" onClick={handleDelete} id={item.id}></i>
              </div>
            </div>
        )})
      }
    </div>
  )

}

export default App
