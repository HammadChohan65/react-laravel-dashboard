import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import Header from './Header'
function Register(){

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigator = useNavigate ();  
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigator('/add')
        }
    },[])

    async function signUp(){
        let data = {name,email,password}
        let result = await fetch('http://localhost:8000/api/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify(data)
        })
        result = await result.json();
        // save in local storage
        localStorage.setItem('user-info',JSON.stringify(result))
        navigator('/add')   

    }
    return(
        <>
        <Header/>
        
        <div className='col-sm-6 offset-3'>
        <h1>User Registration</h1>
        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className='form-control' placeholder='name' /><br/>
        <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className='form-control' placeholder='email' /><br/>
        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className='form-control' placeholder='password' /><br/><br/>
        <button onClick={signUp} className='btn btn-primary'>Sign Up</button>
        </div>

        </>
    );
}

export default Register