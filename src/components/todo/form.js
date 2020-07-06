import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function TodoForm (props){
  const [item,setItem] = useState({})
  
  const handleInputChange = (e) => {
    // let item = {...item};
    // [e.target.name]: e.target.value
    setItem({...item, [e.target.name]: e.target.value } );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    props.handleSubmit(item);
    let item1 = {};
   setItem(item1);
  };

 
    return (
      <Card style={{ width: '25rem' }}>
  <Card.Header  pg='light' as="h3">Add Item</Card.Header>
  <Card.Body>
  <Form onSubmit={handleSubmit} >
      
    <Form.Group controlId="formBasicEmail">
      <Form.Label>To Do Item</Form.Label>
      <Form.Control name="text" type="To Do Item" placeholder="To Do Item" onChange={handleInputChange} />
     
   
    <Form.Group controlId="formBasicPassword">
      <Form.Label >Assigned To</Form.Label>
      <Form.Control name="assignee" type="Assigned To" placeholder="Assigned To" onChange={handleInputChange}/>
    </Form.Group>
    </Form.Group>
    <Form.Group controlId="formBasicRange">
    <Form.Label>Difficulty Rating</Form.Label>
    <Form.Control name="difficulty" type="range" min="1" max="5" onChange={handleInputChange}/>
    </Form.Group>
    <Button variant="primary" type="submit">
    Add Item
    </Button>
  </Form>
  </Card.Body>
</Card>
     
      // <>
      //   <h3>Add Item</h3>
      //   <form onSubmit={handleSubmit}>
      //     <label>
      //       <span>To Do Item</span>
      //       <input
      //         name="text"
      //         placeholder="Add To Do List Item"
      //         onChange={handleInputChange}
      //       />
      //     </label>
      //     <label>
      //       <span>Difficulty Rating</span>
      //       <input defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
      //     </label>
      //     <label>
      //       <span>Assigned To</span>
      //       <input type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
      //     </label>
      //     <button>Add Item</button>
      //   </form>
      // </>
    );
    
}

export default TodoForm;
