import React from 'react'
import { Container, Typography, Grid, Button } from "@mui/material"
import useStyles from "./styles"
import CartItem from "./cartItem/CartItem"
import {Link} from "react-router-dom"

const Cart = ({ cart,handleUpdateCartQty,handleRemoveFromCart,emptyCart }) => {

    const classes = useStyles()
     if (!cart.line_items) return 'Loading';

    const isEmpty = !cart.line_items.length
    const EmptyCart = () => {
        return (
            <Typography variant="subtitle1">Your cart is empty, time to <Link to="/">add</Link> something!</Typography>
        )
    }
    
    const FilledCart = () => {
        return (
            <>
                <Grid container spacing={3}>
                    {cart.line_items.map((item) => {
                        return (
                            <Grid item xs={12} sm={4} key={item.id}>
                                <CartItem item={item} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} emptyCart={emptyCart} />
                            </Grid>
                        )
                    })}
                </Grid>
                <div className={classes.content}>
                    <Typography variant="h4">
                        Total: {cart.subtotal.formatted_with_symbol}
                    </Typography>
                <div className={classes.buttons}>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="error" onClick={() => emptyCart()}>Empty cart</Button>
                        <Button component={Link}  to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
                </div>
            </>
        )
    }


  return (
    <Container className={classes.container}>
          <Typography variant="h3" gutterBottom>Your Shopping Cart</Typography>
          {isEmpty ? <EmptyCart/> : <FilledCart/>}
    </Container>
  )
}

export default Cart