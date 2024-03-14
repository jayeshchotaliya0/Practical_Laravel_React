import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
import 'mui-datatables/dist/index.js';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Leftpanal from "./Leftpanal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


const Dashboard = () => {
  const navigate = useNavigate();
    const columns = ["Date", "Name", "Email", "Status","Action",{
        options:{
        customBodyRenderLite: (dataIndex, rowIndex) => {
            return (
                <>
                    <IconButton aria-label="delete" onClick={() => handleDelete()}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => handleEdit()}>
                        <EditIcon />
                    </IconButton>
                </>
            );
          }
    } }];
    const data = [
        ["25-02-2012", "Jayesh", "jayesh@gmail.com", "Active"],
       ];
    
       const options = {
        filter: false,
        selectableRows: 'none', 
        download: false,
        search: true,
        print: false,
        viewColumns: false,
      };
    
    const handleDelete = () => {
        console.log('Delete button clicked');
    };

    const handleEdit = () => {
        console.log('Edit button clicked');
    };

    const logout = ()=>
    {
      localStorage.clear();

      toast.success("Logout Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        navigate('/login')
        window.location.reload();
      }, 2000);
    }
    
  return (
    <>
      <Leftpanal />

      <div className="dashbrd">
        <div class="w3-container w3-teal">
          <h1>Dashboard</h1>
          <button className="logout addbtn" onClick={logout}>Logout</button>
        </div>

        <div class="w3-container">
           
            <MUIDataTable
            title={"User List"}
            data={data}
            columns={columns}
            options={options} />
        </div>
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
    </>
  );
};

export default Dashboard;
