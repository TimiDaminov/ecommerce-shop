import React from 'react'
import { Typography, Card, CardActions, Button, CardContent, CardMedia } from "@mui/material"
import useStyles  from "./styles"

const CartItem = ({item,handleUpdateCartQty,handleRemoveFromCart}) => {
    const classes = useStyles()
  return (
    <Card>
          <CardMedia image={item.image.url} className={classes.media} />
          <CardContent className={classes.content}>
              <Typography variant="h4">{item.name}</Typography>
              <Typography variant="h5">{item.price.formatted_with_symbol}</Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
              <div className={classes.buttons}>
                  <Button type="button" size="small" onClick={() => {handleUpdateCartQty(item.id, item.quantity - 1)}}>-</Button>
                  <Typography>{item.quantity}</Typography>
                  <Button type="button" size="small" onClick={() => {handleUpdateCartQty(item.id, item.quantity + 1)}}>+</Button>
              </div>
              <Button type="button" variant="contained" color="error" onClick={() => {handleRemoveFromCart(item.id)}}>Remove</Button>
          </CardActions>
    </Card>
  )
}

export default CartItem