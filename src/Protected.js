import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Protected(props){
    const navigator = useNavigate();
    useEffect(()=>{
        let user  = JSON.parse(localStorage.getItem('user-info'))
            if(user != null){
                if(user.error){
                    if(user.error !== ''){
                        navigator('/login')
                    }
                }else{
                    navigator('/all-products')
                }
            }
            else{
                navigator('/login')
            }
    },[])
    let Comp = props.comp;
    return(
        <Comp/>
    );
}
export default Protected