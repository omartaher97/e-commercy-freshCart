import React, { useContext, useState } from 'react';
import Style from './Login.module.css';
import {formik, useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { userContext } from '../Context/UserContext';


export default function Login() {

  const [error, seterror] = useState(null)
  const [isloading, setisloading] = useState(false)
  let {setuserToken}=useContext(userContext)

  let navigate=useNavigate()

 async function loginSubmit(values) {
  setisloading(true)
   let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).catch((error)=>{
    setisloading(false) 
   seterror(error.response.data.message)})
        if (data.message==='success') {
          setisloading(false)

          localStorage.setItem('userToken',data.token)
          setuserToken(data.token)

          navigate('/')


          
        }
  }



  let validationSchema=yup.object({
    
    email:yup.string().email('email is  invalid').required('email is required'),
    password:yup.string().matches(/^[A-Z][a-z0-9]{5,8}$/,'password start with uppercase and from 6 to 9 digit').required('password is required'),
 
  })


  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: '',
    },validationSchema,
    onSubmit: loginSubmit

  });



  return <>

    <div className=' w-75 mx-auto py-5'>
      <h3>login Now</h3>

      <form onSubmit={formik.handleSubmit}>
       
        
       
        <label htmlFor="email">email:</label>
        <input type="email" id='email' name='email' className='form-control mb-2' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.email && formik.touched.email?<div className="alert alert-danger p-2">{formik.errors.email}</div>:''}

        <label htmlFor="password">password:</label>
        <input type="password" id='password' name='password' className='form-control mb-2' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.password && formik.touched.password?<div className="alert alert-danger p-2">{formik.errors.password}</div>:''}
        

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
      
:<>
<button disabled={!(formik.dirty&&formik.isValid)} className='btn bg-main text-white mt-3' type='submit'>Login</button>
<Link className='btn bg-main text-white mt-3 mx-3' to={'/Register'}>Register Now</Link>

</>
}


       
      </form>
    </div>







  </>
}
