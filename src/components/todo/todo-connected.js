import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import Navbar from 'react-bootstrap/Navbar';
import './todo.scss';
import useAjax from '../hooks/ajax.js';
const todoAPI = 'https://todo-app-server-lab32.herokuapp.com/api/v1/todo';


const ToDo = () => {

  const [list, setList] = useState([]);
  const [getElement, postElement, putElement, deleteElement] = useAjax(list,setList);

  const _addItem = (item) => {
    item.due = new Date();
    postElement(todoAPI,item);
  };

  const _toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;
      putElement(url,item);
    }
  };
  const _deleteItem = id =>{
    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
    let url = `${todoAPI}/${id}`;
    deleteElement(url,id);
  }
}
  
  const _getTodoItems = () => {
    getElement(todoAPI);
  };

  useEffect(_getTodoItems, []);

  return (
    <>
      <header>
        {/* <h2>
          There are {list.filter(item => !item.complete).length} Items To Complete
        </h2> */}
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            {console.log('list ----->',list)}
            There are {list.filter(item => !item.complete).length} Items To Complete
    </Navbar.Brand>
        </Navbar>
      </header>

      <section className="todo">

        <div>
          <TodoForm handleSubmit={_addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={_toggleComplete}
            handleDelete={_deleteItem}
          />
        </div>
      </section>
    </>
  );
};

export default ToDo;
