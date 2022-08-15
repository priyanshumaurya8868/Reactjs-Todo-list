import "./App.css";
import Header from "./myComponents/Header";
import { AddTodo } from "./myComponents/AddTodo";
import { Todos } from "./myComponents/Todos";
import { Footer } from "./myComponents/Footer";
import { About } from "./myComponents/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

function App() {
  let initTodos;
  if (localStorage.getItem("todos") === null) {
    initTodos = [];
  } else {
    initTodos = JSON.parse(localStorage.getItem("todos"));
  }

  //kind of livedata
  const [todos, setTodos] = useState(initTodos);

  //whenever there is a change in the value of todos
  //useffect update localStorage,justlike observers
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title, desc) => {
    let sno;
    if (todos.length === 0) {
      sno = 0;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodo]);
  };

  const onDelete = (todo) => {
    setTodos(todos.filter((e) => e !== todo));
  };

  return (
    <Router>
      <Header title="My Todos List" searchBar={false} />
      <Routes>
        <Route
          exact
          path="/"
          element ={
              <>
                <AddTodo addTodo={addTodo} />
                <Todos todos={todos} onDelete={onDelete} />
              </>
          }
        ></Route>
       <Route exact path="/about" element={<About />} /> 
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
