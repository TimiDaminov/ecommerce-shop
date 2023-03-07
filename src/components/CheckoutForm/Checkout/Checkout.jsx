import React from 'react'
import { useState, useEffect } from 'react'
import {commerce} from "../../../lib/commerce"
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from "@mui/material"
import {Link} from "react-router-dom"
import useStyles from "./styles"
import AddressForm from "../AddressForm"
import PaymentForm from '../PaymentForm'
const Checkout = ({cart,order,onCaptureCheckout,error}) => {
  const [checkoutToken,setCheckoutToken] = useState(null)
  const [activeStep, setActiveStep] = useState(0)
  const [shippingData,setShippingData] = useState({})
  const steps = ['Shipping address', 'Payment details']
  const classes = useStyles()

  useEffect(() => {
    const generateToken = () => {
          commerce.checkout.generateToken(cart.id, { type: "cart" }).then((token) => {
          setCheckoutToken(token)
        })
    }
    generateToken()
  },[cart])

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  
  const backStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const next = (data) => {
    setShippingData(data)
    nextStep()
  }
  console.log(checkoutToken)
  const Confirmation = () => (
    <>
      <div>
        <Typography variant="h5" style={{paddingTop:"20px"}}>Thank you for your purchase {shippingData.firstName} {shippingData.lastName}!</Typography>
      </div>
      <br /> 
      <Button component={Link} to="/">Back to Home</Button>
    </>
  )

  const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next} /> : <PaymentForm checkoutToken={checkoutToken} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} />
  
  return (
    <>
      <main className={classes.container}>
        <Paper className={classes.paper}>
          <Typography align='center' variant="h4">Checkout</Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((step) => {
              return (
                <Step key={step}>
                  <StepLabel>
                    {step}
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken ? <Form /> : "Loading..."  }
        </Paper>
      </main>
    </>
  )
}

export default Checkout