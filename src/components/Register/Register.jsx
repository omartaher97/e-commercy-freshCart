import React, { useState } from 'react';
import Style from './Register.module.css';
import {formik, useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';


export default function Register() {

  const [error, seterror] = useState(null)
  const [isloading, setisloading] = useState(false)

  let navigate=useNavigate()

 async function registerSubmit(values) {
  setisloading(true)
   let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).catch((error)=>{
    setisloading(false) 
   seterror(error.response.data.message)})
        if (data.message==='success') {
          setisloading(false)
          navigate('/login')


          
        }
  }

  let RegExp=/^01[0125][0-9]{8}$/;

  let validationSchema=yup.object({
    name:yup.string().min(3,'name min length is 3').max(8,'name max length is 8').required('name is required'),
    email:yup.string().email('email is  invalid').required('email is required'),
    phone:yup.string().matches(RegExp,'phone is invalid').required('phone is required'),
    password:yup.string().matches(/^[A-Z][a-z0-9]{5,8}$/,'password start with uppercase and from 6 to 9 digit').required('password is required'),
    rePassword:yup.string().oneOf([yup.ref('password')],'repassword must be matching to password').required('repassword is required')

  })


  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: '',
    },validationSchema,
    onSubmit: registerSubmit

  });



  return <>

    <div className=' w-75 mx-auto py-5'>
      <h3>Register Now</h3>

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">name:</label>
        <input type="text" id='name' name='name' className='form-control mb-2' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.name && formik.touched.name?<div className="alert alert-danger p-2 ">{formik.errors.name}</div>:''}
        
       
        <label htmlFor="email">email:</label>
        <input type="email" id='email' name='email' className='form-control mb-2' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.email && formik.touched.email?<div className="alert alert-danger p-2">{formik.errors.email}</div>:''}

        <label htmlFor="phone">phone:</label>
        <input type="tel" id='phone' name='phone' className='form-control mb-2' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.phone && formik.touched.phone?<div className="alert alert-danger p-2">{formik.errors.phone}</div>:''}

        <label htmlFor="password">password:</label>
        <input type="password" id='password' name='password' className='form-control mb-2' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.password && formik.touched.password?<div className="alert alert-danger p-2">{formik.errors.password}</div>:''}
        
        <label htmlFor="rePassword">rePassword:</label>
        <input type="Password" id='rePassword' name='rePassword' className='form-control mb-2' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger p-2">{formik.errors.rePassword}</div>:''}

        {error?<div className="alert alert-danger">{error}</div>:''}

        {isloading?  <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>
      
:<button disabled={!(formik.dirty&&formik.isValid)} className='btn bg-main text-white mt-3' type='submit'>Register</button>}
       
      </form>
    </div>







  </>
}
