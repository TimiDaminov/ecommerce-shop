import React from 'react'
import { Grid } from '@mui/material';
import Product from './product/Product';
import useStyles from "./styles"

const Products = ({products,onAddToCart}) => {
    const classes = useStyles()
  return (
    <main className={classes.container}>
          <Grid container justifyContent="center" spacing={4}>
              {products.map((product) => (
                  <Grid item key={product.id} xs={12} sm={6} lg={3}>
                      <Product product={product} onAddToCart={onAddToCart} />
                  </Grid>
              ))}
          </Grid>   
    </main>
  )
}

export default Products