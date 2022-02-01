import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import "./App.css";

export const App = () => {

  const [value, setValue] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    console.log(value)
    setTodoList([...todoList, value])
    setValue('')
  }

  const deleteItem = (index) => {
    if (window.confirm("Are you sure want to delete this item?")) {
      const val = [...todoList]
      val.splice(index, 1)
      setTodoList(val);
    }
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} /><br />
        <button type="submit">Add</button>
      </form>

      <div className="list">
        {
          todoList.length ? todoList.map((item, index) => {
            return (
              <div className="eachList">
                <span>{index + 1 + "."}</span>&nbsp;&nbsp;&nbsp;<span>{item}</span> &nbsp;&nbsp;&nbsp;
                <DeleteIcon className="DeleteIcon" onClick={() => deleteItem(index)} />
              </div>
            )
          }) : "Empty List"
        }
      </div>

    </div>
  )
}