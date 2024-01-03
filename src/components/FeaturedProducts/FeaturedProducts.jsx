import React, { useContext, useEffect, useState } from "react";
import Style from "./FeaturedProducts.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { Circles } from "react-loader-spinner";
import { Link } from "react-router-dom";
import ProductsDetails from "../ProductsDetails/ProductsDetails";
import { cartcontext } from "../CartContext/CartContext";
import toast from "react-hot-toast";

export default function FeaturedProducts() {
  let { addToCart } = useContext(cartcontext);

  async function addProduct(productId) {
    let rseponse = await addToCart(productId);

    if (rseponse.data.status === "success") {
      toast.success("product successfully added to cart", { duration: 2000 });
    } else {
      toast.error("product not added to");
    }
  }

  function getFeaturedProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { isloading, data } = useQuery("featuredProducts", getFeaturedProducts);

  return (
    <>
      {isloading ? (
        <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="contianer py-2">
          <div className="row">
            {data?.data.data.map((product) => (
              <div key={product.id} className="col-md-2 g-4">
                <div className="product p-3 cursor-pointer">
                  <Link to={`/productsDetails/${product.id}`}>
                    <img
                      className="w-100"
                      src={product.imageCover}
                      alt={product.title}
                    />
                    <span className="text-main font-sm fw-bolder ">
                      {product.category.name}
                    </span>
                    <h3 className="h6 ">
                      {product.title.split(" ").splice(0, 2).join(" ")}
                    </h3>
                    <div className="d-flex justify-content-between mt-3">
                      <span>{product.price} EGP</span>
                      <span>
                        <i className="fas fa-star rating-color"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => addProduct(product.id)}
                    className="btn bg-main text-white w-100 btn-sm mt-2 "
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
