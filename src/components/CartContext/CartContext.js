import axios from 'axios';
import React, { createContext } from 'react'



export let cartcontext=createContext();
export default function CartContextProvider(props) {

    let headers={ token:localStorage.getItem(`userToken`)}

    function addToCart(productId) {

       return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId},{headers}).then((response)=>response).catch((error)=>error)
        
    }

    function getLoggedUserCart() {

     return  axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers}).then((response)=>response).catch((err)=>err)
        
    }

    function removeCartItem(productId) {

      return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers}).then((response)=>response).catch((err)=>err)
        
    }

    function updateProductQuantity(productId,count) {

        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count},{headers}).then((response)=>response).catch((err)=>err)
        
    }

   async function clearUserCart() {

        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`,{headers})
        
    }
  return (
    <cartcontext.Provider value={{addToCart,getLoggedUserCart,removeCartItem,updateProductQuantity,clearUserCart}}>

      {  props.children}

    </cartcontext.Provider>
    
  )
}
