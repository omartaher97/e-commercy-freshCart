import React from 'react';
import Style from './CategorieSlider.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function CategorieSlider() {

  function getCategories() {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    
  }

  let {data}=useQuery(`categorieSlider`,getCategories)



  return <>

  <h1>categorieSlider</h1>
  
  
  
  
  </>
}
