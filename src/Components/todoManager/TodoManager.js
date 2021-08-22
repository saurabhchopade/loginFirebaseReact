import React,{useState,useEffect} from 'react';
import './TodoManager.css';
import app from '../../config/firebase';
import { Button,FormControl,InputLabel,Input} from '@material-ui/core';
import TodoComp from '../todo/TodoComp';
import firebase from "firebase";

function TodoManager() {
  const db = app.firestore();

  const [todos,setTodos]= useState([]);
  const [input,setInput]  = useState('');
 
  //initial Loading when app
  //this will update in realtime without refresh
  useEffect(() => {
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      setTodos(snapshot.docs.map( doc=> ({id:doc.id, todo:doc.data().todo}) ))
    })
  }, []);

  const addTodo = (event)=>{
    //Stop the refresh of submit button
    event.preventDefault();
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    //for clearing input After Add 
    setInput('');
  }

  return (
    <div className="App">
    <h1>Todo Manager 📅</h1>
    <form>
      <FormControl>
        <span>
          <InputLabel>😀 Write Todo</InputLabel>
          <Input value={input}  onChange={event => setInput(event.target.value)}></Input>
          <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">Add Todo</Button>
        </span>
      </FormControl>
    </form>

    <ul>
      {todos.map(todo =>(
        <TodoComp todo={todo}></TodoComp>
     ))}  
    </ul>
    </div>
  );
}

export default TodoManager;
