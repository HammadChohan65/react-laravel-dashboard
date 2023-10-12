import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from 'react-router-dom';
import { Container, Table } from "react-bootstrap";


function Products(){


    const [productsData, setProductsData] = useState([]);

useEffect(() => {
  (async () => {
    try {
      let result = await fetch('http://localhost:8000/api/show-products');
      result = await result.json();
      setProductsData(result);
      console.log("data loaded successfully");
    } catch (error) {
      console.error(error);
    }
  })();
}, []); // Empty dependency array to run the effect only once

function deleteProd(id){
    (async()=>{
      let result = await fetch('http://localhost:8000/api/delete-product/'+id,{
        method: 'delete'
      });
      result = await result.json();
      if(result.status == '200'){
        (async () => {
            try {
              let result = await fetch('http://localhost:8000/api/show-products');
              result = await result.json();
              setProductsData(result);
              console.log("data loaded successfully,after delete");
            } catch (error) {
              console.error(error);
            }
          })();
        alert("Product Deleted Successfully");

    }else{
        alert("Product Couldn't Deleted !!");
    }
    })()
}

    return (
        <>
        <Header/>
        <Container>
        <div className="d-flex  justify-content-between mt-4 mb-4">
        <h2>All Products</h2>
        <Link to="/add"><button className="btn btn-primary">Add Product</button></Link>
        </div>
        <Table className="col-md-8" striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Image</th>
          <th>Delete</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
     {
     productsData.map((item,index)=>
        <tr>
          <td>{index+1}</td>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.price}</td>
          <td>
            <img src={'http://localhost:8000/'+item.image_path} className="product-img"/>
         </td>
         <td><button onClick={()=>{deleteProd(item.id) }} className="btn btn-danger">Delete</button></td>
         <td>
            <Link to={'/update-product/'+item.id}>
                <span className="btn btn-primary">Edit</span>
            </Link>
        </td>
        </tr>
        )
    }
        
      </tbody>
    </Table>
    </Container>

        </>
    );
}

export default Products