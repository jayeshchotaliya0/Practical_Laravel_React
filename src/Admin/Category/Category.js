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
import APP_URL from "../../envorment"

const Category = () => {
  
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [deletedata, setDeletedata] = useState(false);


  const columns = [
    {
      name: "id",
    },
    {
      name: "Image",
      options: {
        customBodyRender: (value) => <img src={`${process.env.REACT_APP_API_URL}${value}`} alt="image" style={{ width: '100px', height: '100px' }} />,
      }
    },
    {
      name: "Title",
    },
    {
      name: "Status",
    },
    {
      name: "Date",
    },
    {
      name: "Action",
      options: {
        customBodyRender: (value, tableMeta) => {
          const id = tableMeta.rowData[0];
          return (
            <>
                <IconButton aria-label="delete" onClick={() => handleDelete(id)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="edit" onClick={() => handleEdit(id)}>
                    <EditIcon />
                </IconButton>
            </>
            )
        } 
      }
    },
  ];

  const options = {
    filter: false,
    selectableRows: 'none', 
    download: false,
    search: true,
    print: false,
    viewColumns: false,
  };

  useEffect(() => {
    fetch(`${APP_URL}/categories`)
      .then(response => response.json())
      .then(data => setCategories(data.data))
      .catch(error => console.error('Error fetching categories:', error));
      setDeletedata(false);
  }, [deletedata]);

  const Data = categories.map(item => [
    item.id,
    item.image,
    item.title,
    item.status==1?'Active':'Inactive',
    item?.created_at?.substring(0, 10) 
  ]);
 
  const handleDelete = async(id) => {
      try {
        const response = await axios.delete(`${APP_URL}/category_delete/${id}`, {
        });
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
    } catch (error) {
        console.error('Error deleting data:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editcategory/${id}`);
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
            autoClose={200}
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
