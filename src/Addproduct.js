import React,{useState} from 'react';
import Header from './Header';

function Addproduct(){
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [image,setImage] = useState('');

    const formdata = new  FormData()
    async function storeProduct(){
        formdata.append('name',name);
        formdata.append('description',description);
        formdata.append('price',price);
        formdata.append('image',image);
        
       let result = await fetch('http://localhost:8000/api/store-products',{
                    method:'POST',
                    body: formdata
                    })

            result = await result.json();
            window.alert('Product Added Successfully')
    }
    return(
        <>
        <Header/>
        
        <div className='col-sm-6 offset-3'>
        <h1>Add Products</h1>
        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className='form-control' placeholder='Name' /><br/>
        <input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}} className='form-control' placeholder='Description' /><br/>
        <input type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}} className='form-control' placeholder='Price' /><br/>
        <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} className='form-control' placeholder='Image' /><br/>
        <button onClick={storeProduct} className='btn btn-primary'>Add</button>
        </div>

        </>
    );
}

export default Addproduct