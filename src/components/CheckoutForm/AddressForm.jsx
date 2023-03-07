import React,{useState,useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from "@mui/material"
import { useForm, FormProvider } from "react-hook-form"
import FormInput from "./FormInput"
import { commerce } from "../../lib/commerce"
import { Link } from "react-router-dom"

const AddressForm = ({checkoutToken,next}) => {
const methods = useForm()
const [shippingCountries, setShippingCountries] = useState([])
const [shippingCountry,setShippingCountry] = useState('')
const [shippingSubdivisions, setShippingSubdivisions] = useState([])
const [shippingSubdivision, setShippingSubdivision] = useState('')    
const [shippingOptions, setShippingOptions] = useState([])
const [shippingOption, setShippingOption] = useState('')

const countries = Object.entries(shippingCountries).map(([code,name]) => {
    return({id:code,label:name})
})
const subdivisions = Object.entries(shippingSubdivisions).map(([code,name]) => {
    return({id:code,label:name})
})
    const options = shippingOptions.map((option) => {
    return({id:option.id, label:`${option.description} - (${option.price.formatted_with_symbol})`})
})
    
    const fetchShippingCountries = (checkoutTokenId) => {
        commerce.services.localeListShippingCountries(checkoutTokenId).then(({ countries }) => {
        setShippingCountries(countries)
        setShippingCountry(Object.values(countries)[0])  
        })
        
    }

    const fetchSubdivisions = (countryCode) => {
        commerce.services.localeListSubdivisions(countryCode).then(({ subdivisions }) => {
            setShippingSubdivisions(subdivisions)
            setShippingSubdivision(Object.values(subdivisions)[1])
        })
    }
    
    const fetchShippingOptions = (checkoutTokenId,country,region=null) => {
        commerce.checkout.getShippingOptions(checkoutTokenId, { country, region }).then((options) => {
            setShippingOptions(options)
            setShippingOption(options[0].id)
        })
    } 

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])
    
    useEffect(() => {
        if (shippingCountry) {
            fetchSubdivisions(shippingCountry)
        }
    }, [shippingCountry])
    
    useEffect(() => {
        if (shippingSubdivision) {
           fetchShippingOptions(checkoutToken.id,shippingCountry,shippingSubdivision) 
        }
        
    },[shippingSubdivision])

    
  return (
      <>
          <Typography gutterBottom variant="h6">
              Shipping Address
          </Typography>
          <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit((data) => {next({...data,shippingCountry,shippingSubdivision,shippingOption})})}>
                  <Grid container spacing={3} sx={{p:2}}>
                      <FormInput required={true} name="firstName" label="First name" />
                      <FormInput required={true} name="lastName" label="Last name" />
                      <FormInput required={true} name="address1" label="Your address" />
                      <FormInput required={true} name="email" label="Email" />
                      <FormInput required={true} name="city" label="City" />
                      <FormInput required={true} name="zip" label="ZIP / Postal code" />

                      <Grid item xs={12} sm={6}>
                          <InputLabel>Shipping Country</InputLabel>
                          <Select value={shippingCountry} fullWidth onChange={((e) => {
                              setShippingCountry(e.target.value)
                          })}>
                              {countries.map((country) => { return (<MenuItem key={country.id} value={country.id}>{country.label}</MenuItem>) })}
                          </Select>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                          <InputLabel>Shipping Subdivision</InputLabel>
                          <Select value={shippingSubdivision} fullWidth onChange={((e) => {setShippingSubdivision(e.target.value)})}>
                              {subdivisions.map((subdivision) => { return (<MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label}</MenuItem>) })}
                          </Select>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                          <InputLabel>Shipping Option</InputLabel>
                          <Select value={shippingOption} fullWidth onChange={((e) => {setShippingOption(e.target.value)})} >
                               {options.map((option) => { return (<MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>) })}
                          </Select>
                      </Grid>
                        
                  </Grid>
                  <div style={{ display: "flex",justifyContent:"center",gap:10}}>
                      <Button component={Link} to="/cart" type="button" variant="outlined">Back to cart</Button>
                      <Button type="submit" variant="contained">Next</Button>
                  </div>
              </form>
          </FormProvider>
      </>
  )
}

export default AddressForm