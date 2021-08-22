import React from 'react'
import app from '../../config/firebase';
import TodoManager from '../todoManager/TodoManager';


const Hero =()=>{

const logOut = ()=>{
    app.auth().signOut();
}
    return(
        <div>
            <span>
                <button onClick={logOut}>LogOut</button>
                <TodoManager></TodoManager>
            </span>
        </div>
    );
}

export default Hero;