import React, { useEffect, useState,useContext } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import Navbar from 'react-bootstrap/Navbar';
import './todo.scss';
import useAjax from '../hooks/ajax.js';
import { SettingsContext } from '../context/site';
const todoAPI = 'https://todo-app-server-lab32.herokuapp.com/api/v1/todo';


const ToDo = () => {
  const siteContext = useContext(SettingsContext);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
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
            There are {list.filter(item => item.complete?!item.complete:false).length} Items To Complete
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
            page={page}
            handleComplete={_toggleComplete}
            handleDelete={_deleteItem}
          />
          <div className='ml-5'>
          <button type="button" className= {page===1&&list.filter(i => siteContext.show?true:!i.complete ).length>=siteContext.listNum?'d-none btn btn-secondary mr-2':' btn btn-secondary mr-2'}  onClick={()=>{setPage(page-1)}}>previous</button>
          <button type="button" className= {Math.ceil(list.filter(i => siteContext.show?true:!i.complete ).length/siteContext.listNum)===page?'d-none btn btn-secondary mr-2':' btn btn-secondary mr-2'} onClick={()=>{setPage(page+1)}}>next</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ToDo;
