import { useEffect, useState } from 'react'

import Todo from './components/todo';
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';

import './App.css'
import axios from 'axios';

function App() {
  const url = "http://localhost:3000/tarefas"

  const [todos, setTodos] = useState([]);

  const [search, setSearch] = useState("")

  const [filter, setFilter] = useState("All")
  const [sort, setSort] = useState("Asc")

  useEffect(() => {
    axios.get(url)
      .then(res => setTodos(res.data))
  }, [todos, setTodos])

  const addTodo = (text, category) => { 
    axios.post(url, {
      text,
      category
    })
  }

  const removeTodo = (id) => {
    axios.delete(`${url}/${id}`)
    .then( response => {
      console.log(response.data)
    })
    .catch(error => console.log(error))
  }

  const completeTodo = (id) => {
    axios.patch(`${url}/${id}`, {
      isCompleted: true,
    })
    .then( response => {
      console.log(response.data)
    })
    .catch(error => console.log(error))
  }

  const disCompleteTodo = (id) => {
    axios.patch(`${url}/${id}`, {
      isCompleted: false,
    })
    .then( response => {
      console.log(response.data)
    })
    .catch(error => console.log(error))
  }

  return <div className="app">
    <h1>Lista de Tarefas</h1>
    <Search search={search} setSearch={setSearch} />
    <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
    <div className="todo-list">
      {todos
        .filter((todo) =>
          filter === "All"
            ? true
            : filter === "Completed"
            ? todo.isCompleted
            : !todo.isCompleted
        ) 
        .filter((todo) =>
          todo.text.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a,b) =>
          sort === "Asc"
          ? a.text.localeCompare(b.text)
          : b.text.localeCompare(a.text)
        )
        .map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            removeTodo={removeTodo}
            completeTodo={completeTodo}
            disCompleteTodo={disCompleteTodo}
          />
      ))}
    </div>
    <TodoForm addTodo={addTodo} />
  </div>
}

export default App