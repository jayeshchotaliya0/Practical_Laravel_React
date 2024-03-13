import React, { useState } from "react";
import { Link } from "react-router-dom";
import Leftpanal from "../Leftpanal";


const Add = () => {
  const [ title,setTitle] = useState('');
  const [ error,setError] = useState('');

   const handleSubmit=(e)=>
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
      alert("success");
    }

   }
  return (
    <>
      <Leftpanal />

      <div className="dashbrd">
        <div class="w3-container w3-teal">
          <h1>Category Add</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div class="w3-container">
              <div class="containers">
                <label for="uname"><b>Title <span className="red">*</span></b></label>
                <input type="text" placeholder="Title" name="fullname" onChange={(e)=>setTitle(e.target.value)}/>
                <span className="red">{error}</span><br></br>

                <label for="psw"><b>Description</b></label><br></br>
                <textarea className="description"  rows="6"/><br></br>

                <label for="psw"><b>Image</b></label>
                <input type="file" name="image"/>

                <label for="psw"><b>Status</b></label>
                <select className="status" name="status"> 
                    <option value="0">Active</option>
                    <option value="1">InActive</option>
                </select>

                <button type="submit" className="addbtns">Add</button>&nbsp;
                <Link to="/category"><button type="submit" className="addbtnbk">Back</button></Link>
              </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Add;
