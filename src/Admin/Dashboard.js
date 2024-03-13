import React from "react";
import { Link } from "react-router-dom";
import '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
import 'mui-datatables/dist/index.js';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Leftpanal from "./Leftpanal";


const Dashboard = () => {
    const columns = ["Name", "Company", "City", "State",{
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
        ["Joe Jamesfdfdfdfdfdf", "Test Corpdfdfdfdf", "Yonkedfdfdfdrs", "NdfdfdfdfdffdfY"],
        ["John Walsh", "Test Corp", "Hartford", "CT"],
        ["Bob Herm", "Test Corp", "Tampa", "FL"],
        ["James Houston", "Test Corp", "Dallas", "TX"],
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
    
  return (
    <>
      <Leftpanal />

      <div className="dashbrd">
        <div class="w3-container w3-teal">
          <h1>Dashboard</h1>
        </div>

        <div class="w3-container">
           
            <MUIDataTable
            title={"User List"}
            data={data}
            columns={columns}
            options={options} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
