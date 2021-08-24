import React,{useState,useEffect} from "react";
import app from './config/firebase';
import Hero from './Components/userProfile/Hero';
import firebase from "firebase";
import './App.css';
import Login from "./Components/login/Login";

function App() {
    const db = app.firestore();
    
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [user,setUser] = useState('');
  const [emailError,setEmailError] = useState('');
  const [hasAccount,setHasAccount] = useState(false);

  const clearInputs =()=>{
      setEmail('');
      setPassword('');
  }

  const clearError =()=>{
      setEmailError('');
  }
  
  const handleLogin =()=>{
      clearError();
      app.auth().signInWithEmailAndPassword(email,password).catch((error)=>{
          // TODO: error handling using error code
                setEmailError(error.message);
    });};

const handelSignUp =()=>{
    clearError();
    app.auth().createUserWithEmailAndPassword(email,password)
    .then(cred=>{
            db.collection('users').doc(cred.user.uid).set({
                todo: "Welcome"+" : "+app.auth().currentUser.email,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                uid: app.auth().currentUser.uid
            });
    })
    .catch((error)=>{
        // TODO: error handling using error code
                setEmailError(error.message);
    });};

const authListener = () =>{
    app.auth().onAuthStateChanged(function(user) {
        if(user){
            clearInputs();
            setUser(user);
        }else{
            setUser("");
        }
    });
};

useEffect(()=>{
    authListener();
},[]);

  return (
        <div>
          {
              user ? (
              <Hero ></Hero>
              ):
              (
                <Login
                email         ={email}
                setEmail      ={setEmail}
                password      ={password}
                setPassword   ={setPassword}
                handleLogin   ={handleLogin}
                handlelSignUp ={handelSignUp}
                hasAccount    ={hasAccount}
                setHasAccount ={setHasAccount}
                emailError    ={emailError}
                />
              )
          }  
        
            </div>
  );
};

export default App;
