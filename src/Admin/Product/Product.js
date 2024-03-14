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

const Product = () => {
  
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [deletedata, setDeletedata] = useState(false);


  const columns = [
    {
      name: "id",
    },
    {
      name: "Title",
    },
    {
      name: "Price",
    },
    {
      name: "Qty",
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
    fetch(`${APP_URL}/products`)
      .then(response => response.json())
      .then(data => setProducts(data.data))
      .catch(error => console.error('Error fetching categories:', error));
      setDeletedata(false);
  }, [deletedata]);

  const Data = products.map(item => [
    item.id,
    item.title,
    item.price,
    item.qty,
    item.status==1?'Active':'Inactive',
    item?.created_at?.substring(0, 10) 
  ]);

  

  const handleDelete = async(id) => {
      try {
        const response = await axios.delete(`${APP_URL}/delete/${id}`, {
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
    navigate(`/editproduct/${id}`);
  };
 
  return (
    <>
      <Leftpanal />

      <div className="dashbrd">
        <div class="w3-container w3-teal">
          <h1>Product</h1>
        </div>

        <div class="w3-container">
           <button className="btn btn-sm addbtn"><Link to="/addproduct">Add Product</Link></button>
            <MUIDataTable
            title={"Product List"}
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

export default Product;
