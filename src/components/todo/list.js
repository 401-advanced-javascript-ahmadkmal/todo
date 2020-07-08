import React,{ useContext } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { SettingsContext } from '../context/site';
function TodoList(props) {
  const siteContext = useContext(SettingsContext);
  console.log('from list ---->',props.page,siteContext.listNum,(props.page-1)*siteContext.listNum,(props.page)*SettingsContext.listNum)
  function compare(a, b) {
    // a is less than b by some ordering criterion
    if (a[siteContext.sort]<b[siteContext.sort]) {
      return -1;
    }
    // a is greater than b by the ordering criterion
    if (a[siteContext.sort]>b[siteContext.sort]) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

  return (
    <>
      <ListGroup style={{ width: '25rem' }} className='ml-5'>
      {props.list
      .filter(i => siteContext.show?true:!i.complete )
      .sort(compare)
      .slice((props.page-1)*siteContext.listNum,(props.page)*siteContext.listNum)
      .map(item => (
        
        <ListGroup.Item  variant={ item.complete?'success':'danger'} key={item._id} onClick={() => props.handleComplete(item._id)} className='mb-2'>
          <Card style={{ width: '18rem' }} >
  <Card.Body>
    <Button variant="primary" className="float-right" onClick={() => props.handleDelete(item._id)}>X</Button>
    <Card.Title>{item.complete?'complete':'pending'}</Card.Title>
    
    <Card.Subtitle className="mb-2 bottom">{item.assignee}</Card.Subtitle>
    <Card.Text>
    {item.text}
    </Card.Text>
    <Card.Subtitle className="mb-2 bottom float-right">difficulty :{item.difficulty}</Card.Subtitle>
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
