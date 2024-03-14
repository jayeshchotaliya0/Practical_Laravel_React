import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Leftpanal from "../Leftpanal";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import APP_URL from "../../envorment";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Add = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [title,setTitle] = useState('');
  const [desc,setDesc] = useState('');
  const [image,setImage] = useState('');
  const [status,setStatus] = useState('');
  const [ error,setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
        try {
          if(id)
          {
            const response = await fetch(`${APP_URL}/categorie/${id}`);
            if (!response.ok) { throw new Error('Failed to fetch data'); }

            const data = await response.json();
            setTitle(data?.data?.title);
            setImage(data?.data?.image);
            setDesc(data?.data?.description)
            setStatus(data?.data?.status)
          }
           
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    fetchData();
  }, []);

   const handleSubmit = async(e)=>
   {
      e.preventDefault();
      
      let isValid = true;
      if (!title.trim()) {
        setError('Please Enter Title');
        isValid = false;
    } else {
      setError('');
    }

    if(isValid)
    {
      console.log("statusstatus",status)
      const fd = new FormData();

      fd.append("title", title);
      fd.append("description", desc);
      fd.append("image", image);
      fd.append("status", status);
      try {
        let response = '';
        if(id)
        {
           response = await axios.post(`${APP_URL}/category_update/${id}`,fd);
        }else{
           response = await axios.post(`${APP_URL}/category_store`,fd);
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
            navigate(`/category`);
          }, 1500);
        }
      
      } catch (error) {
        console.error('Error updating data:', error);
      }
    }
   }
   

   console.log("statusstatus",status)
  return (
    <>
      <Leftpanal />
      <div className="dashbrd">
        <div class="w3-container w3-teal">
          <h1>Category {id ? 'Edit' : 'Add'}</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div class="w3-container">
              <div class="containers">
                <label for="uname"><b>Title <span className="red">*</span></b></label>
                <input type="text" placeholder="Title" name="fullname" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <span className="red">{error}</span><br></br>

                <label for="psw"><b>Description</b></label><br></br>
                <textarea className="description" value={desc} onChange={(e)=>setDesc(e.target.value)} rows="6"/><br></br>

                <label for="psw"><b>Image</b></label>
                <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])}/>
                { image && id ? (<><img src={`${process.env.REACT_APP_API_URL}${image}`} alt="image" style={{ width: '50px', height: '50px' }} /><br></br><br></br> </> ) : ('') }
                

                <label for="psw"><b>Status</b></label>
                <select className="status" name="status" value={status==0?status:1} onChange={(e)=>setStatus(e.target.value)}>
                    <option>Please select</option> 
                    <option value="1">Active</option>
                    <option value="0">InActive</option>
                </select>

                <button type="submit" className="addbtns">{id?'Update':'Add'}</button>&nbsp;
                <Link to="/category"><button type="submit" className="addbtnbk">Back</button></Link>
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
