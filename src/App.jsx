import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [inputData, setInputData] = useState("")
  const [toDoArray, setToDoArray] = useState([])
  // const [checked, setChecked] = useState(true)

  function handleChange(e) {
    setInputData(() => {
      return e.target.value
    }
  )}

  function handleClick(e) {
    e.preventDefault()
    const id = uuidv4()
    if(inputData.length > 0) {
      setToDoArray(prevState => {
       return [...prevState, {
        id: id,
        text: inputData,
        checked: false
       }]
      })
      setInputData(() => "")
    }
  }

  function handleDelete(e) {
    const clickedToDo = e.target.id
  
    const filterArray = toDoArray.filter(item => {
      if(item.id !== clickedToDo) {
        return true
      }
      return false
    })

    setToDoArray(filterArray)
  }

  function handleCheck(e) {
    const click = e.target.id

    const newArr = toDoArray.map(item => {
      if(item.id === click) {
         return {
          id: item.id,
          text: item.text,
          checked: !item.checked
         }
      }else{
        return item
      }
    })
    setToDoArray(newArr)
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

          const styles = {
            backgroundColor: item.checked ? "red" : "#f8f9fa"
          }
        
          return (
            <div key={uuidv4()} className="todo-container" style={styles}>
              <div className="todo">
                  <input
                    key={uuidv4()}
                    type="checkbox"
                    checked= {item.checked}
                    // defaultChecked={false}
                    onChange={handleCheck}
                    id={item.id}
                  />
                  {item.text}
              </div>
              <div className="function-icons">
                <i className="fa-regular fa-pen-to-square" id={item.id}></i>
                <i className="fa-solid fa-trash-can" onClick={handleDelete} id={item.id}></i>
              </div>
            </div>
        )})
      }
    </div>
  )

}

export default App
