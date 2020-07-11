import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
function TodoList(props) {


  return (
    <>
      <ListGroup style={{ width: '25rem' }} className='ml-5'>
      {props.list.map(item => (
        
        <ListGroup.Item  variant={ item.complete?'success':'danger'} key={item._id} onClick={() => props.handleComplete(item._id)} className='mb-2'>
          <Card style={{ width: '18rem' }} >
  <Card.Body>
    <Button variant="primary" className="float-right" onClick={() => props.handleDelete(item._id)}>X</Button>
    <Card.Title>{item.complete?'complete':'pending'}</Card.Title>
    
    <Card.Subtitle className="mb-2 bottom">{item.assignee}</Card.Subtitle>
    <Card.Text>
    {item.text}
    </Card.Text>
  </Card.Body>
</Card>
          

          </ListGroup.Item>
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
