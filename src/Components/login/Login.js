import React from 'react'
function Login(props) {
    const {email      ,
        setEmail      ,
        password      ,
        setPassword   ,
        handleLogin   ,
        handlelSignUp ,
        hasAccount    ,
        setHasAccount ,
        emailError    ,
         }=props;

    return(
        <section className="login" >
        <div className="loginContainer">
            <label>UserName</label>
            <input type="text" 
            autoFocus
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
             ></input>
             <p className="errorMsg">{emailError}</p>
             <label>Password</label>

             <input
             type="password"
             required
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
             ></input>
             
             <div className="btnContainer">
                 {hasAccount ? (
                     <>
                        <button onClick={handleLogin}>Sign In</button>
                        <p>Dont Have an Account ? <span onClick={()=>setHasAccount(!hasAccount)}>Sign Up</span> </p>
                     </>
                     ):(
                        <>
                        <button onClick={handlelSignUp}>Sign up</button>
                        <p>Have an Account ? <span span onClick={()=>setHasAccount(!hasAccount)}>Sign In</span> </p>
                     </>
                     ) 
                     };

             </div>
        </div>
        </section>
    );
};

export default Login;