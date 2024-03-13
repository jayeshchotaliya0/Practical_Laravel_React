import React, { useEffect, useState } from "react";
import { Link,useNavigate  } from "react-router-dom";
import '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
import 'mui-datatables/dist/index.js';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Leftpanal from "../Leftpanal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [deletedata, setDeletedata] = useState(false);

    const columns = ["Id","Date","Image", "title", "status","Action",{
        options:{
          customBodyRender: (value, tableMeta, updateValue) => {
            if (value) { 
              return (
                  <img  src={value} alt="Category" style={{width: "100px", height: "100px"}} />
              );
          } else {
              return null;
          }
        },
        customBodyRenderLite: (dataIndex, rowIndex) => {
            return (
                <>
                    <IconButton aria-label="delete" onClick={() => handleDelete(dataIndex,rowIndex)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => handleEdit(dataIndex,rowIndex)}>
                        <EditIcon />
                    </IconButton>
                </>
            );
          }
          
    }}];
  
    const options = {
      filter: false,
      selectableRows: 'none', 
      download: false,
      search: true,
      print: false,
      viewColumns: false,
    };


  useEffect(() => {
    fetch('http://localhost:8000/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, [deletedata]);

  const Data = categories.map(item => [
    item.id,
    item.created_at.substring(0, 10),
    item.image,
    item.title,
    item.status==1?'Active':'Inactive',
  ]);

  const handleDelete = async(dataIndex,rowIndex) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/category_delete/${Data[dataIndex][0]}`, {
      });
      console.log("responseresponse",response);
      if(response.data)
      {
        setDeletedata(true);
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      // setDeleteStatus(response.data.message);
      // Assuming the API returns a message
  } catch (error) {
      console.error('Error deleting data:', error);
      // setDeleteStatus('Error deleting data. Please try again.');
  }
  };

  const handleEdit = (dataIndex,rowIndex ) => {
    const categoryid = Data[dataIndex][0];
    alert(categoryid);
    navigate(`/category/${categoryid}`);
  
  };
  

  return (
    <>
      <Leftpanal />

      <div className="dashbrd">
        <div class="w3-container w3-teal">
          <h1>Category</h1>
        </div>

        <div class="w3-container">
           <button className="btn btn-sm addbtn"><Link to="/addcategory">Add Category</Link></button>
            <MUIDataTable
            title={"Category List"}
            data={Data}
            columns={columns}
            options={options} />
        </div>
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

export default Category;
