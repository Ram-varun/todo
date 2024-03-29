import React, { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "./App.css";

export const App = () => {

  const [value, setValue] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [editIndex, setEditIndex] = useState('');

  useEffect(()=>{
    localStorage.setItem('todoList', todoList)
  },[todoList])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    if (todoList.indexOf(value.trim()) === -1) {
      if (editIndex === '') {
        setTodoList([...todoList, value.trim()])
      } else {
        let temp = [...todoList]
        temp.splice(editIndex, 1, value.trim())
        setTodoList([...temp])
      }
      setValue('')
      setEditIndex('')
    } else {
      alert("Already Added!!!")
    }
  }

  const editItem = (item, index) => {
    setValue(item)
    setEditIndex(index)
  }

  const deleteItem = (index) => {
    if (window.confirm("Are you sure want to delete this item?")) {
      const val = [...todoList]
      val.splice(index, 1)
      setTodoList(val);
    }
  }
  let datas = localStorage.getItem('todoList')
  return (
    <div className="App">
      <h1 className="heading">Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="todo..." value={value} onChange={(e) => setValue(e.target.value)} autoFocus /><br />
        <button type="submit">Add</button>
      </form>

      <div className="list">
        {
          todoList.length ? todoList.map((item, index) => {
            return (
              <div className="eachList fs20">
                <span>{index + 1 + "."}</span>&nbsp;&nbsp;&nbsp;<span className="text">{item}</span> &nbsp;&nbsp;&nbsp;
                <EditIcon className="curptr" onClick={() => editItem(item, index)} />&nbsp;&nbsp;&nbsp;
                <DeleteIcon className="curptr" onClick={() => deleteItem(index)} />
              </div>
            )
          }) : <span className="fs20">Empty List</span>
        }
      </div>
    </div>
  )
}