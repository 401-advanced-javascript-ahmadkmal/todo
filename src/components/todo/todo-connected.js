import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import Navbar from 'react-bootstrap/Navbar';
import './todo.scss';

const todoAPI = 'https://todo-app-server-lab32.herokuapp.com/api/v1/todo';


const ToDo = () => {

  const [list, setList] = useState([]);

  const _addItem = (item) => {
    item.due = new Date();
    fetch(todoAPI, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(savedItem => {
        setList([...list, savedItem])
      })
      .catch(console.error);
  };

  const _toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;

      fetch(url, {
        method: 'put',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
        .then(response => response.json())
        .then(savedItem => {
          setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
        })
        .catch(console.error);
    }
  };
  const _deleteItem = id =>{
    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
    let url = `${todoAPI}/${id}`;

    fetch(url, {
      method: 'delete',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(savedItem => {
        let list1 = list.filter(item => item._id != id)
        console.log('id = >' ,id , 'filter =',list1)

        setList(list1);
      })
      .catch(console.error);
    }
  }
  
  const _getTodoItems = () => {
    fetch(todoAPI, {
      method: 'get',
      mode: 'cors',
    })
      .then(data => data.json())
      .then(data => {
        console.log('data = >',data);
        setList(data);
        
      })
      .catch(console.error);
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
