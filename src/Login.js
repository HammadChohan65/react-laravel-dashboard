import React,{useState,useEffect,useRef} from 'react';
import {useNavigate} from 'react-router-dom'
import Header from './Header'
function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userInfo, setUserInfo] = useState("");
    const navigator = useNavigate();
    const hasLoggedIn = useRef(false); // Using a ref to track if login logic has already executed
    
    useEffect(() => {
      let user  = JSON.parse(localStorage.getItem('user-info'))
      
      if (!hasLoggedIn.current && user) {
        
          if (user.error !== '') {
            alert('Email/Password Is Incorrect');
          } else {
          setTimeout(() => {
            alert('Logged in Successfully');
            navigator('/all-products');
          }, 1000);
          }
        hasLoggedIn.current = true; // Set the flag to true
        
      }

    }, [userInfo]);
    

    async function Login(){
        let data = {email,password}
        let result = await fetch('http://localhost:8000/api/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify(data)
        })
        result = await result.json();
        if(result.error == ''){
          // save in local storage
          localStorage.setItem('user-info',JSON.stringify(result.user))
          setUserInfo(JSON.stringify(result))
          navigator('/all-products')   
        }else{
          alert('Email/Password does not match !')
        }

    }
    
    return(
        <>
        <div className='loginWrapper'>
        <Header/>
        
        <div className='col-sm-6 offset-3'>
        <div className='login-from'>
        <h1>Admin Login</h1>
        <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className='form-control' placeholder='email' /><br/>
        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className='form-control' placeholder='password' /><br/><br/>
        <button onClick={Login} className='btn btn-primary'>Login</button>
        </div>
        </div>
        </div>
        </>
    );
    
}

export default Login