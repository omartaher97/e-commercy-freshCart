import React, { useContext } from 'react';
import Style from './ProductsDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { cartcontext } from "../CartContext/CartContext";
import toast from "react-hot-toast";


export default function ProductsDetails() {

  let params=useParams()
  function getProductsDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    
  }

  let{data,isLoading,}=useQuery(`ProductsDetails`, ()=> getProductsDetails(params.id));
  console.log(data);
// let {id}=data.data.data
  let {addToCart}=useContext(cartcontext)
  // console.log(rseponse.data.status);
  // async function addProduct(productId){
  //   let rseponse=await addToCart(productId)
   
  //   if (rseponse.data.status==='success') {

  //     toast.success('product successfully added to cart',{duration:2000,})
      
  //   }
  //   else{

  //     toast.error('product not added to')

  //   }
    
  // }


  return <>

      {data?.data.data? 
      <div className='row py-2 align-items-center'>
          <div className="col-md-4 my-2">
            <img className='w-100' src={data?.data.data.imageCover} alt={data?.data.data.title}/>
          </div>
          <div className="col-md-8 my-3">
            <h2 className='h5'>{data?.data.data.title}</h2>
            <p >{data?.data.data.description}</p>
            <div className="d-flex justify-content-between mt-3">
            <span>{data?.data.data.price} EGP</span>
            <span><i className="fas fa-star rating-color"></i>{data?.data.data.ratingsAverage}</span>
          </div>
          <button  className="btn bg-main text-white w-100 btn-sm mt-2 ">Add to cart</button>

          </div>
      </div>:''}

  
  
  
  
  
  </>
}
