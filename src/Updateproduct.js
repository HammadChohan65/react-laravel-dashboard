import React,{useEffect, useState} from 'react';
import Header from './Header';
import { useParams } from 'react-router-dom'; 

function Updateproduct(props){
    const { id } = useParams(); 

    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [image,setImage] = useState('');


    // fetching product data
    useEffect(()=>{
        ( async()=>{
            let result = await fetch('http://localhost:8000/api/product-details/'+id)
            result = await result.json();
            if(result.status == '200'){
                setName(result.data.name)
                setDescription(result.data.description)
                setPrice (result.data.price)
                // setImage(result.data.image_path)
            }else{
                console.warn('data not found')
            }   
            })()
    },[])


    const formdata = new  FormData()
    async function updateProduct(){
        formdata.append('name',name);
        formdata.append('description',description);
        formdata.append('price',price);
        if(image != ''){
            formdata.append('image',image);
        }
        
        
       let result = await fetch('http://localhost:8000/api/update-product/'+id,{
                    method:'POST',
                    body: formdata
                    })

            result = await result.json();
            window.alert('Product Updated Successfully')
    }
    return(
        <>
        <Header/>
        
        <div className='col-sm-6 offset-3'>
        <h1 className='my-5'>Update Product</h1>

        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className='form-control' placeholder='Name' /><br/>
        <input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}} className='form-control' placeholder='Description' /><br/>
        <input type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}} className='form-control' placeholder='Price' /><br/>
         <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} className='form-control' placeholder='Image' /><br/>
        <button onClick={updateProduct} className='btn btn-primary'>Update</button>
        </div>

        </>
    );
}

export default  Updateproduct