import React, { useContext, useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { cartcontext } from "../CartContext/CartContext";
import { Circles } from "react-loader-spinner";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Cart() {
  let navigate=useNavigate()
  let { getLoggedUserCart,removeCartItem,updateProductQuantity,clearUserCart } = useContext(cartcontext);

  const [cartDetails, setcartDetails] = useState(null);

  async function getCart() {
    let { data } = await getLoggedUserCart();
    console.log(data);
    setcartDetails(data);
  }

  async function removeItem(id) {
    let{data}=await removeCartItem(id);
    setcartDetails(data)
    
  }

  async function updateQuantity(productId,count) {

    let{data}=await updateProductQuantity(productId,count)
    setcartDetails(data)
  }

  async function clearCart() {

    let {data}= await clearUserCart()
    setcartDetails(data)
    
  }



  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
    {cartDetails? 
     <div className="container mx-auto bg-main-light p-3">
        <div className="d-flex justify-content-between mb-4 border-bottom">
          <div>
            <h3 className="pt-3">Cart Shop</h3>
            <h4 className="h6 mt-2 pt-5 text-main">total price:{cartDetails.data.totalCartPrice}</h4>
          </div>
          <div>
            <button className="bg-primary text-white p-3 my-3 rounded border-0">check out</button>
          <h4 className="h6 my-3 text-main">total number of items:{cartDetails.numOfCartItems}</h4>
          </div>
        </div>
        {cartDetails.data.products.map((product)=> <div key={product.product.id} className="row border-bottom py-2 px-2">

          <div className="col-md-2"> <img className="w-100" src={product.product.imageCover} alt={product.product.title} /></div>

          <div className="col-md-10">
            <div className="d-flex justify-content-between align-items-center mt-5 pt-2">
              <div>
                <h3 className="h6">{product.product.title.split(" ").splice(0,3).join(" ")} </h3>
                <h6 className="text-main">price :{product.price} EGP</h6>
              </div>
              <div>
                <button onClick={()=>updateQuantity(product.product.id,product.count+1)} className="btn brdr-main">+</button>
                <span className="px-3">{product.count}</span>
                <button onClick={()=>updateQuantity(product.product.id,product.count-1)} className="btn brdr-main fw-bolder">-</button>
              </div>

            </div>
            <button onClick={()=>removeItem(product.product.id)} className="btn p-0"><i className="text-danger fas fa-trash-can px-1"></i> Remove</button>
          </div> 
          
        </div>)}
        <button onClick={()=>{clearCart(); navigate('/') }}  className="btn brdr-main w-100 my-5 ">Clear Your Cart</button>
      </div>
    
       :<> <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
       <Circles
         height="80"
         width="80"
         color="#4fa94d"
         ariaLabel="circles-loading"
         wrapperStyle={{}}
         wrapperClass=""
         visible={true}
       />
     </div></>}
     
    </>
  );
}
