import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [inputData, setInputData] = useState("")
   
  const [toDoArray, setToDoArray] = useState([])
  const [completedTasksArr, setCompletedTasksArr] = useState([])

  function handleChange(e) {
    setInputData(() => {
      console.log(inputData)
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
        checked: false,
        edit: false
       }]
      })
      setInputData(() => "")
    }
  }

  function handleDelete(e) {
    const clickedToDo = e.target.id
    console.log("delete")
    function filter(arr) {
      const filterArray = arr.filter(item => {
        if(item.id !== clickedToDo) {
          return true
        }
        return false
      })
      return filterArray
    }

    setToDoArray(filter(toDoArray))
    setCompletedTasksArr(filter(completedTasksArr))
  }

  function handleCheck(e) {

    function flipChecked(item) {
      if(item.id === e.target.id) {
        return {
         id: item.id,
         text: item.text,
         checked: !item.checked,
         edit: item.edit
        }
     }
     return item
    }

    const newArr = toDoArray.map(item => flipChecked(item))
    const newArr2 = completedTasksArr.map(item => flipChecked(item))

    const merged = [...newArr, ...newArr2]

    const completed = merged.filter(item => {
      if(item.checked===true) {
        return true
      }
      return false
    })

    const notCompleted = merged.filter(item => {
      if(item.checked=== false) {
        return true
      }
      return false
    })

    setCompletedTasksArr(completed)
    setToDoArray(notCompleted)
  }

  function changeEditState(e) {
    const clickedItem = e.target.id

    function handleChange(arr) {
        const editArr = arr.map(item => {
          if(item.id === clickedItem) {
            return {
                id: item.id,
                text: item.text,
                checked:item.checked,
                edit: true
            }
          }
          return item
        })
        return editArr
      }

      setToDoArray(handleChange(toDoArray))
      setCompletedTasksArr(handleChange(completedTasksArr))
  }


  function submitEdit(e,item) {
    const valueInput = document.getElementById("edit" + item.id).value

    function submit(arr) {
      const newArr = arr.map(item => {
        if(item.id === e.target.id) {
        return {
          id: item.id,
          text:valueInput,
          checked: item.checked,
          edit: false
         }
        } 
        return item
      })
      return newArr
    }  

    setToDoArray(submit(toDoArray))
    setCompletedTasksArr(submit(completedTasksArr))
  }

  function todoHtml(item) {
    const styles = {
      backgroundColor: item.checked ? "red" : "#f8f9fa"
    }
  
    return (
      <div key={uuidv4()} className="todo-container" style={styles}>
        <div className="todo" >
            <input
              key={uuidv4()}
              type="checkbox"
              checked= {item.checked}
              onChange={handleCheck}
              id={item.id}
            />
            {item.edit ? 
            <form>
              <input 
                key={uuidv4()}
                type="text" 
                className="edit-input" 
                defaultValue={item.text} 
                id={"edit" + item.id}
              /> 
              </form>
              :
              <p className="todo-text" >{item.text}</p>
            }
        </div>
        <div className="function-icons">
          {item.edit ? <div><i className="fa-solid fa-check" onClick={(e) => submitEdit(e,item)} id={item.id}></i></div> : <div><i className="fa-regular fa-pen-to-square" onClick={changeEditState} id={item.id}></i></div>}
          <div><i className="fa-solid fa-trash-can" onClick={handleDelete} id={item.id}></i></div>
        </div>
      </div>
  )}

  return (
    <div>
      <div>
      <h1>To Do List</h1>
      <form>
        <input
          value={inputData}
          type="text"
          name="newToDo"
          placeholder="ADD NEW TASK"
          onChange={handleChange}
        />
        <button onClick={handleClick}><i className="fa-solid fa-plus"></i></button>
      </form>
      </div>

      <div>
      { toDoArray.length > 0 || completedTasksArr.length > 0 ?
        <div>
          {toDoArray.map(item => todoHtml(item))}

          {completedTasksArr.length > 0 ? <p>Completed Tasks</p> : ""}

          {completedTasksArr.map(item => todoHtml(item))}
        </div>

        : <div className="start-icon"><i className="fa-solid fa-hippo fa-2xl"></i></div>}
      </div>
    </div>
  )
}

export default App
