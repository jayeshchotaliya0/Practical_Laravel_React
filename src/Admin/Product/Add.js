import React, {useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import Leftpanal from "../Leftpanal";
import APP_URL from "../../envorment";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

const Add = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [errotitle, setErrortitle] = useState('');

    const [price, setPrice] = useState('');
    const [error, setError] = useState('');

    const [desc, setDesc] = useState('');

    const [qty, setQty] = useState('');
    const [errorqty, setErrorqty] = useState('');

    const [status, setStatus] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
  
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
        const fetchData = async () => {
            try {
                // Fetch Single Product details
                if(id)
                {
                    const res = await fetch(`${APP_URL}/product/${id}`);
                    if (!res.ok) { throw new Error('Failed to fetch category details'); }
                    const resdata = await res.json();
                    setTitle(resdata?.data?.title);
                    setDesc(resdata?.data?.description);
                    setCategory(resdata?.data?.categories);
                    setPrice(resdata?.data?.price);
                    setQty(resdata?.data?.qty);
                    setStatus(resdata?.data?.status);
                }
                
                const response = await fetch(`${APP_URL}/categorie_act`);
                if (!response.ok) { throw new Error('Failed to fetch data'); }
    
                const data = await response.json();
                setCategories(data?.data)
               
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchData();
    }, []); 
    
    const handleSubmit = async (e) => {
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

        
        if(isValid)
        {
            const fd = new FormData();

            fd.append("title", title);
            fd.append("description", desc);
            fd.append("categories", category);
            fd.append("price", price);
            fd.append("qty", qty);
            fd.append("status", status);
            try {
                let response = '';
                if(id)
                {
                    response = await axios.post(`${APP_URL}/product_update/${id}`,fd);
                }
                else
                {
                    response = await axios.post(`${APP_URL}/product_store`,fd);
                }

                if(response.data)
                {
                    toast.success(response.data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(function() {
                        navigate(`/product`);
                    }, 1500);
                }
            
            } catch (error) {
                console.error('Error updating data:', error);
            }
        }
        
    }

  return (
    <>
        <Leftpanal />
        <div className="dashbrd">
        <div class="w3-container w3-teal">
            <h1>Product {id?'Edit':'Add'}</h1>
        </div>
        <form onSubmit={handleSubmit}>
            <div class="w3-container">
                <div class="containers">
                    <label for="title"><b>Title <span className="red">*</span></b></label>
                    <input type="text" placeholder="Title" name="fullname" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                    <span className='red'>{errotitle}</span><br></br>
                    
                    <label for="desc"><b>Description</b></label><br></br>
                    <textarea className="description"  rows="6" value={desc} onChange={(e)=>setDesc(e.target.value)}/><br></br>

                    <label for="psw"><b>Category</b></label>
                    <select className="status" name="category" value={category} onChange={(e)=>setCategory(e.target.value)}>
                        <option>Please Select Category</option> 
                        { categories.map(function(v,i){
                                return(<>
                                    <option value={v.id}>{v.title}</option>
                                </>) 
                            })} 
                    </select>

                    <label for="price"><b>Price <span className='red'>*</span></b></label>
                    <input type="text" placeholder="e.g., 10.50" name="price"  value={price} onChange={handlePriceChange}/>
                    {error && <span className='red'>{error}</span>} <br></br><br></br>

                    <label for="qty"><b>Qty <span className='red'>*</span></b></label>
                    <input type="text" placeholder="e.g., 10" name="qty"  value={qty} onChange={handleChange}/>
                    {error && <span className='red'>{errorqty}</span>} <br></br>

                    <label for="sts"><b>Status</b></label>
                    <select className="status" name="status" value={status==0?status:1} onChange={(e)=>setStatus(e.target.value)}>
                        <option>Please Select</option>  
                        <option value="1">Active</option>
                        <option value="0">InActive</option>
                    </select>

                    <button type="submit" className="addbtns">{id?'Update':'Add'}</button>&nbsp;
                    <Link to="/product"><button type="submit" className="addbtnbk">Back</button></Link>
            
                </div>
            </div>
        </form>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
    </>
  );
};

export default Add;
