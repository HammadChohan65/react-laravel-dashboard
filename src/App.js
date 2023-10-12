import './App.css';
import React  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import  {BrowserRouter,Routes, Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Products from './Products';
import Addproduct from './Addproduct';
import Updateproduct from './Updateproduct';
import Protected from './Protected'

function App() {
 
  return (
    <div className='App'>
      <BrowserRouter>
     
      <Routes>
      <Route path='/all-products' element={ <Protected comp={Products}/> }></Route>
      <Route path='/login' element={ <Protected comp={Login}/> }></Route>
      <Route path='/register' element={<Protected comp={Register}/>}></Route>
      <Route path='/update-product/:id' element={<Protected comp={Updateproduct}/>}></Route>
      <Route path='/add' element={  <Protected comp={Addproduct}/>}></Route>
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
