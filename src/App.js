import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import db from './firebase';
import firebase from "firebase"
const App=()=> {
  const [todos,setTodos] = useState([])


  //when the app laods, we need to listen to the database and fetch new todos
  useEffect(() => {
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snap=>{
      setTodos(snap.docs.map(doc=> ({id : doc.id , todo:doc.data().todo} ) ) )
    
    })
  }, []);
  return (
    <div className="App">
      <div>
        <h1>To Do List</h1>
    </div>
    <TodoForm
        saveTodo={(todoText) => {
          const trimmedText = todoText.trim();
          
          db.collection('todos').add({
            todo:trimmedText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
        
        }}
      />
    {todos.map(todo=>(
      <TodoList  todo={todo}/>
    ))}
    </div>
  );
}

export default App;
