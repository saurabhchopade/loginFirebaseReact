import React,{useState} from 'react'
import { ListItem,ListItemText,Modal,Button} from '@material-ui/core';
import app from '../../config/firebase';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { findAllByDisplayValue } from '@testing-library/react';
import { makeStyles } from '@material-ui/core/styles';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import TextField from '@material-ui/core/TextField';
import { spacing } from '@material-ui/system';


const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 700,
      backgroundColor: '#CAD5E2',
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  

function TodoComp(props) {
    const classes = useStyles();
    const db = app.firestore();
    const [input,setInput] = useState('');

    const [open,setOpen] = useState(false);
    
    const handleOpen =()=>{
        setOpen(true);
    }
    
    const handleClose =()=>{
        setOpen(false);
    }

    const updateTodo =() =>{
        db.collection('users').doc(props.todo.id).set({
            todo: input
        },{merge:true})
    }   

    return (
        <>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className={classes.paper}>
                <TextField p={-10} id="outlined-basic" label="Type ✏️" variant="outlined" placeholder={props.todo.todo } value={input} onChange={event=>setInput(event.target.value)} />
              <span>"                "</span>
                <BorderColorIcon onClick={updateTodo} style={{ fontSize:   60}}>
                </BorderColorIcon>
            </div>
        </Modal>
            <ListItem >
                <ListItemText primary={props.todo.todo} secondary="Deadline 🗓️"/>
                <BorderColorIcon style={{ fontSize:   40}}  onClick={e=>setOpen(true)}>Edit</BorderColorIcon>
            <DeleteSweepIcon  style={{ fontSize:   40}} onClick={event  => db.collection('users').doc(props.todo.id).delete()} variant="contained" color="primary"></DeleteSweepIcon>
            </ListItem>
        </>
    )
}

export default TodoComp;
