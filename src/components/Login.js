import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthApi from "./Auth/AuthAPI";
import Cookies from 'js-cookie';

// import cert from "../cert/saigonparking_server.crt"
import { UserServiceClient } from '../api/Actor_grpc_web_pb'
import { Int64Value } from 'google-protobuf/google/protobuf/wrappers_pb';
// import  grpc  from 'grpc';
const fs = require('fs');


const gatewayHost = "http://saigonparking.wtf:8000/com.bht.saigonparking.api.grpc.user.UserService/";
const userService = new UserServiceClient(gatewayHost)
// const userService = new UserServiceClient(gatewayHost, grpc.credentials.createSsl(fs.readFileSync(cert)))

const callUserService = () => {
  const metadata = { 'Authorization': 'Bon Map' }
  const request = new Int64Value();
  request.setValue(3)
  const call = userService.getUserById(request, metadata, (err, res) => {
    if (err) {
      console.log('AAAAAAAAAAAAAAAAAAAAA');
      console.log('Status: ' + err.status);
      console.log('Code: ' + err.code);
      console.log('Message: ' + err.message);
    } else {
      console.log('BBBBBBBBBBBBBBBBBBBBB');
      console.log(res.getMessage());
    }
  })
  call.on('status', (status) => {
    console.log('CCCCCCCCCCCCCCCCCCCCC');
    console.log(status.code);
    console.log(status.details);
    console.log(status.metadata);
  });
}

const Login = () => {

  const [isPlay, setisPlay] = useState(false);
  const Auth = React.useContext(AuthApi)
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    }),
    onSubmit: values => {
      Auth.setAuth(true)
      Cookies.set("user", "LoginTrue")
      callUserService()

      alert(JSON.stringify(values, null, 2) + "\nchờ 10s sau nút submit mới nhấn được nữa");
      setisPlay(true)
      setTimeout(
        function () {
          console.log("đã hết 10s submit")
          setisPlay(false)
        }
        ,
        8000
      );
    },
  });



  return (



    <form onSubmit={formik.handleSubmit}>
      <div style={{ margin: 10 }}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div>{formik.errors.firstName}</div>
        ) : null}
      </div>

      <div style={{ margin: 10 }}>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div>{formik.errors.lastName}</div>
        ) : null}
      </div>

      <div style={{ margin: 10 }}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
      </div>
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}
      <div style={{ margin: 10 }}>
        <button style={{ margin: 10 }} type="submit" disabled={(isPlay === true) ? true : false} >Submit</button>
        <button
          style={{ margin: 10 }}
          onClick={formik.handleReset}
          type="reset"
        >
          Reset
        </button>
      </div>


    </form>

  );
};
export default Login;
