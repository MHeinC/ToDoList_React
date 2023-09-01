import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ToDoItem from "./ToDoHtml";

function App() {
  const [inputData, setInputData] = useState("");
  const [toDoArray, setToDoArray] = useState([]);
  const [completedTasksArr, setCompletedTasksArr] = useState([]);

  function handleChange(e) {
    setInputData(() => {
      return e.target.value;
    });
  }

  function handleClick(e) {
    e.preventDefault();
    const id = uuidv4();

    if (inputData.length > 0) {
      setToDoArray((prevState) => {
        return [
          ...prevState,
          {
            id: id,
            text: inputData,
            checked: false,
            edit: false,
          },
        ];
      });
      setInputData(() => "");
    }
  }

  const myParams = {
    toDoArray: toDoArray,
    setToDoArray: setToDoArray,
    completedTasksArr: completedTasksArr,
    setCompletedTasksArr: setCompletedTasksArr,
  };

  return (
    <div>
      <header>
        <h1>Todo List</h1>
        <form>
          <input
            value={inputData}
            type="text"
            name="newToDo"
            placeholder="ADD NEW TASK"
            onChange={handleChange}
          />
          <button onClick={handleClick}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </form>
      </header>

      <main>
        {toDoArray.length > 0 || completedTasksArr.length > 0 ? (
          <div>
            {toDoArray.map((item) => (
              <ToDoItem allParams={myParams} key={uuidv4()} item={item} />
            ))}

            {completedTasksArr.length > 0 ? <p>Completed Tasks</p> : ""}

            {completedTasksArr.map((item) => (
              <ToDoItem allParams={myParams} key={uuidv4()} item={item} />
            ))}
          </div>
        ) : (
          <div className="start-icon">
            <i className="fa-solid fa-hippo fa-2xl"></i>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
