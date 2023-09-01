import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function ToDoItem(props) {
  const item = props.item;

  const styles = {
    backgroundColor: props.item.checked ? "#ffc2d1" : "#f8f9fa",
  };

  const inputTextStyle = {
    backgroundColor: item.checked ? "#ffe5ec" : "white",
  };

  function deleteItem(e) {
    const clickedToDo = e.target.id;

    function filterClickedToDo(arr) {
      const filterArray = arr.filter((item) => {
        if (item.id !== clickedToDo) {
          return true;
        }
        return false;
      });
      return filterArray;
    }
    props.allParams.setToDoArray(filterClickedToDo(props.allParams.toDoArray));
    props.allParams.setCompletedTasksArr(
      filterClickedToDo(props.allParams.completedTasksArr)
    );
  }

  function changeCheckedState(e) {
    function flipChecked(item) {
      if (item.id === e.target.id) {
        return {
          id: item.id,
          text: item.text,
          checked: !item.checked,
          edit: item.edit,
        };
      }
      return item;
    }

    const newArr = props.allParams.toDoArray.map((item) => flipChecked(item));
    const newArr2 = props.allParams.completedTasksArr.map((item) =>
      flipChecked(item)
    );
    const merged = [...newArr, ...newArr2];

    const completedItems = merged.filter((item) => {
      if (item.checked === true) {
        return true;
      }
      return false;
    });

    const incompletedItems = merged.filter((item) => {
      if (item.checked === false) {
        return true;
      }
      return false;
    });

    props.allParams.setCompletedTasksArr(completedItems);
    props.allParams.setToDoArray(incompletedItems);
  }

  function changeItemEditState(e) {
    const clickedItem = e.target.id;

    function handleChange(arr) {
      const editArr = arr.map((item) => {
        if (item.id === clickedItem) {
          return {
            id: item.id,
            text: item.text,
            checked: item.checked,
            edit: true,
          };
        }
        return item;
      });
      return editArr;
    }

    props.allParams.setToDoArray(handleChange(props.allParams.toDoArray));
    props.allParams.setCompletedTasksArr(
      handleChange(props.allParams.completedTasksArr)
    );
  }

  function submitEdit(e, item) {
    const valueInput = document.getElementById("edit" + item.id).value;

    function submit(arr) {
      const newArr = arr.map((item) => {
        if (item.id === e.target.id) {
          return {
            id: item.id,
            text: valueInput,
            checked: item.checked,
            edit: false,
          };
        }
        return item;
      });
      return newArr;
    }

    props.allParams.setToDoArray(submit(props.allParams.toDoArray));
    props.allParams.setCompletedTasksArr(
      submit(props.allParams.completedTasksArr)
    );
  }

  return (
    <div key={uuidv4()} className="todo-container" style={styles}>
      <div className="todo-item">
        <input
          key={uuidv4()}
          type="checkbox"
          checked={item.checked}
          onChange={changeCheckedState}
          style={inputTextStyle}
          id={item.id}
        />
        {item.edit ? (
          <form className="edit-form">
            <input
              key={uuidv4()}
              type="text"
              className="edit-input-text"
              style={inputTextStyle}
              defaultValue={item.text}
              id={"edit" + item.id}
            />
          </form>
        ) : (
          <p className="todo-item-text">{item.text}</p>
        )}
      </div>
      <div className="function-icons">
        {item.edit ? (
          <div>
            <i
              className="fa-solid fa-check"
              onClick={(e) => submitEdit(e, item)}
              id={item.id}
            ></i>
          </div>
        ) : (
          <div>
            <i
              className="fa-regular fa-pen-to-square"
              onClick={changeItemEditState}
              id={item.id}
            ></i>
          </div>
        )}
        <div>
          <i
            className="fa-solid fa-trash-can"
            onClick={deleteItem}
            id={item.id}
          ></i>
        </div>
      </div>
    </div>
  );
}
