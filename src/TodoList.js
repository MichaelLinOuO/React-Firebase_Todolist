import React,{useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import db from './firebase';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
 
  hover:{
    padding: '10px',
    background: "#FFFFFF",
    '&:hover': {
       background: "#C8C8C8",
    }
  }
}));

function TodoList(props){
  const classes = useStyles();
  const [open,setOpen] = useState(false);
  const [input,setInput] = useState();
 const handleOpen=()=>{
   setOpen(true);
 };

 const updateTodo = ()=>{
  db.collection('todos').doc(props.todo.id).set({
    todo: input
  }, {merge:true});


  setOpen(false);

 }
  return (
    <>
    <Modal
      open={open}
      onClose={e=> setOpen(false)}>
        <div className={classes.paper}><h1>Hello</h1>
        <input placeholder={props.todo.todo} value={input} onChange={event=>setInput(event.target.value)}/>
        <IconButton onClick={updateTodo}> Update Todo </IconButton>
        </div>
     
    </Modal>
    
    
      <List>
      <ListItem dense button>
        <Checkbox tabIndex={-1} disableRipple />
        <ListItemText primary={props.todo.todo} />
        <ListItemSecondaryAction>
          <IconButton
            
          >            
          </IconButton>
          <EditIcon onClick={e=>setOpen(true)} className={`${classes.hover}`}/>
          <DeleteOutlineIcon aria-label="Delete" className={`${classes.hover}`}
            onClick={() => {
              db.collection('todos').doc(props.todo.id).delete()
            }}/>
       
        </ListItemSecondaryAction>
      </ListItem>
   
  </List>
  </>
  
  )
};
export default TodoList;