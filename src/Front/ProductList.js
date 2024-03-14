import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazyload';
import { useParams } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ProductList = () => {
  let { id } = useParams();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products`)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);
  
  return (
    <>
      <div class="container">
      <Grid container spacing={12}>
        {
            categories.map(function(v,i){
              return(
                <>
                    <Grid item xs={3}>
                      <Item>
                        <LazyLoad height={10} width={20} once>
                        <Link to={`/product/${v.id}`}>
                            <img src={v.image} alt="Lazy Loaded Image" style={{height:'100px'}} />
                        </Link>  
                      </LazyLoad>
                      </Item>
                      <Link to={`/product/${v.id}`}>
                        <p>{v.category}</p>
                        <b>{v.price}</b>
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

export default ProductList;
