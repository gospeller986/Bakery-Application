import React ,{useState ,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAutheticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/cartHelper'
import StripeCheckoutButton from 'react-stripe-checkout'
import { API } from '../backend'
import { createOrder } from './helper/orderHelper'


const StripeCheckout = ({products ,
     setReload = f => f,
     reload = undefined 
 }) => { 

     const [data, setData] = useState({
        loading: false ,
        success :  false ,
        error: "",
        address: ""
     })

     const token = isAutheticated() && isAutheticated().token 
     const userId = isAutheticated() && isAutheticated().user._id 

     const getFinalAmount = () => {
          let amount = 0 ;
          products.map(p=> {
            amount += p.price 
          })
          return amount ;
     } 

     const makePayment = (token) =>  {
        const body = {
         token,
         products
        }
        const headers = {
         "Content-Type" : "application/json"
        }
         
        return fetch(`${API}/stripepayment` , {
           method : "POST",
           headers,
           body : JSON.stringify(body)
        }).then(response => {
              console.log(response)
              //call further methods 
              const {status} = response ;
              console.log("STATUS", status)
              const orderData = {
               products: products ,
               transaction_id: response.transaction.id,
               amount : response.transaction.amount 
              }
              createOrder(userId , token , orderData)
              cartEmpty(()=> {
                console.log("did we Crash") ;
              })
              setReload(!reload)
        }).catch(error => console.log(error))

     }

     const showStripeButton = () => {
        return  isAutheticated() ? ( 
            <StripeCheckoutButton
             stripeKey='pk_test_51LjiHUSCzHeIrcRGFHXbn8FeqXeYOlbyMjAaN754mFyLsu2bfTW97PW6fZVkGLN19pzIAUD0kklTRXdVRJgBKWs8005eNGAJNL'
             token={makePayment}
             amount={getFinalAmount()*100}
             name="Buying Products"
             shippingAddress
             billingAddress
            >
                <button className='btn btn-success' >Pay with Stripe</button>
            </StripeCheckoutButton>
            
        ) : ( <Link to="/signin"><button className='btn btn-success'></button></Link>)
     }

  return (
    <div >
         <h3 className='text-white'>
          Stripe CheckOut {getFinalAmount()} 
         </h3>
         {showStripeButton()}
         </div>
  )
}

export default StripeCheckout