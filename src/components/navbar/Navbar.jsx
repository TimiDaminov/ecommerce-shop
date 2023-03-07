import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from "@mui/material"
import { ShoppingCart } from "@mui/icons-material"
import {Link,useLocation} from "react-router-dom"
import useStyles from "./styles"

const Navbar = ({totalItems}) => {
  const classes = useStyles()
  const location = useLocation()

  if (location.pathname === "/") {
    
  }
  return (
      <>
        <AppBar position="fixed" color="inherit" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
            <Typography component={Link} to="/" variant="h6">E-SHOP</Typography> 
                <div  />
          <div>
          {location.pathname === "/" && (
              <IconButton component={Link} to="/cart" aria-label="Show cart items" color="black">
                      <Badge badgeContent={totalItems} color="primary">
                        <ShoppingCart/>
                      </Badge>
              </IconButton>
          )}
          </div>
              </Toolbar>
          </AppBar>
      </>
  )
}

export default Navbar