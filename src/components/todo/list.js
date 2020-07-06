import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
function TodoList(props) {


  return (
    <>
      <ListGroup style={{ width: '25rem' }} >
      {props.list.map(item => (
        
        <ListGroup.Item  variant={ item.complete?'success':'danger'} key={item._id} onClick={() => props.handleComplete(item._id)} className='ml-5'>{item.text}</ListGroup.Item>
      ))}
      </ListGroup>
    </>
    


    // <ul>
    //   {props.list.map(item => (
    //     <li
    //       className={`complete-${item.complete.toString()}`}
    //       key={item._id}
    //     >
    //       <span onClick={() => props.handleComplete(item._id)}>
    //         {item.text}
    //       </span>
    //     </li>
    //   ))}
    // </ul>
    );
}

export default TodoList;
