import React, {useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Leftpanal from "../Leftpanal";
import $ from 'jquery';
import 'select2'; 


const Add = () => {
    const [title, setTitle] = useState('');
    const [errotitle, setErrortitle] = useState('');

    const [price, setPrice] = useState('');
    const [error, setError] = useState('');

    const [qty, setQty] = useState('');
        const [errorqty, setErrorqty] = useState('');

    const handlePriceChange = (e) => {
        const inputValue = e.target.value;
        const decimalRegex = /^\d*\.?\d*$/;
        if (inputValue === '' || decimalRegex.test(inputValue)) {
          setPrice(inputValue);
          setError('');
        } else {
          setError('Please enter a valid decimal number');
        }
    };
    const handleChange=(e)=>{
        const inputValue = e.target.value;
        const integerRegex = /^\d*$/;
        if (inputValue === '' || integerRegex.test(inputValue)) {
            setQty(inputValue);
            setErrorqty('');
          } else {
            setErrorqty('Please enter a valid integer number');
          }
    }

    useEffect(() => {
        $('.select2').select2();
        return () => {
          $('.select2').select2();
        };
      }, []); 
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
      
        if (!title.trim()) {
            setErrortitle('Please Enter Title');
            isValid = false;
        } else {
            setErrortitle('');
        }
        if(!price)
        {
            setError('Please enter a valid decimal price');
            isValid = false;
        }else{
            setError('');
        }
        if(!qty)
        {
            setErrorqty('Please enter qty');
            isValid = false;
        }else{
            setErrorqty('');
        }

        
        if (isValid) {
          alert("success");
        }
        
    }
   
  return (
    <>
        <Leftpanal />
        <div className="dashbrd">
        <div class="w3-container w3-teal">
            <h1>Product Add</h1>
        </div>
        <form onSubmit={handleSubmit}>
            <div class="w3-container">
                <div class="containers">
                    <label for="title"><b>Title <span className="red">*</span></b></label>
                    <input type="text" placeholder="Title" name="fullname" onChange={(e)=>setTitle(e.target.value)}/>
                    <span className='red'>{errotitle}</span><br></br>
                    
                    <label for="desc"><b>Description</b></label><br></br>
                    <textarea className="description"  rows="6"/><br></br>

                    <label for="psw"><b>Category</b></label>
                    <select className="status select2" name="status[]" multiple="multiple"> 
                        <option value="0">Active</option>
                        <option value="1">InActive</option>
                    </select>

                    <label for="price"><b>Price <span className='red'>*</span></b></label>
                    <input type="text" placeholder="e.g., 10.50" name="price"  value={price} onChange={handlePriceChange}/>
                    {error && <span className='red'>{error}</span>} <br></br><br></br>

                    <label for="qty"><b>Qty <span className='red'>*</span></b></label>
                    <input type="text" placeholder="e.g., 10" name="qty"  value={qty} onChange={handleChange}/>
                    {error && <span className='red'>{errorqty}</span>} <br></br>

                    <label for="sts"><b>Status</b></label>
                    <select className="status" name="status"> 
                        <option value="0">Active</option>
                        <option value="1">InActive</option>
                    </select>

                    <button type="submit" className="addbtns">Add</button>&nbsp;
                    <Link to="/product"><button type="submit" className="addbtnbk">Back</button></Link>
            
                </div>
            </div>
        </form>
        </div>
    </>
  );
};

export default Add;
