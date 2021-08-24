import React from 'react'
import { ListItem,ListItemText} from '@material-ui/core';
import app from '../../config/firebase';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
function TodoComp(props) {
    const db = app.firestore();
    return (
        <div color="primary">
            <ListItem >
                <ListItemText primary={props.todo.todo} secondary="Deadline 🕰️">
                </ListItemText>
            <DeleteSweepIcon onClick={event  => db.collection('users').doc(props.todo.id).delete()} variant="contained" color="primary"></DeleteSweepIcon>
            </ListItem>
            
        </div>
    )
}

export default TodoComp;
