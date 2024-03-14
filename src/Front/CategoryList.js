import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazyload';
import APP_URL from "../envorment";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${APP_URL}/categorie_act`)
      .then(response => response.json())
      .then(data => setCategories(data.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);
  
  console.log("categories",categories);

  return (
    <>
      <div class="container">
      <Grid container spacing={12}>
        {
            categories.map(function(v,i){
              return(
                <>
                    <Grid item xs={6}>
                      <Item>
                        <Link to={`/product/${v.id}`}>
                            <img src={`${process.env.REACT_APP_API_URL}${v.image}`} alt="Lazy Loaded Image" style={{height:'200px'}} />
                        </Link>  
                      </Item>
                      <Link to={`/product/${v.id}`}>
                        <p>{v.title}</p>
                        <b>{v.description}</b>
                      </Link>
                    </Grid>
                   
                </>
              )
            })
        }
    </Grid>
      </div>
    </>
  );
};

export default CategoryList;
