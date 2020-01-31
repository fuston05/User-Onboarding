import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// bring in props from withFormik as an obj{}
const LogInForm = ( { values, errors, touched, status } ) => {
  return (
    <div className= 'formCont'>

      <Form>
        <label>Name:
          <Field 
          name= 'name' 
          placeholder= 'Name'
          />
        </label>

        {/* Yup error handling */}
        {touched.name && errors.name && <p className= 'errors'>{ errors.name }</p>}

        <label>Email:
          <Field 
          name= 'email'
          type= 'email' 
          placeholder= 'Email'
          />
        </label>

         {/* Yup error handling */}
        {touched.email && errors.email && <p className= 'errors'>{ errors.email }</p> }

        <label>Password:
          <Field 
          name= 'password'
          type= 'password' 
          placeholder= 'Password'
          />
        </label>

         {/* Yup error handling */}
        {touched.password && errors.password && <p className= 'errors'>{ errors.password }</p>}

        <label>Terms of Service:
          <Field 
          check= {values.terms.toString()}
          name= 'terms'
          type= 'checkbox' 
          />
        </label>

         {/* Yup error handling */}
        {touched.terms && errors.terms && <p className= 'errors'>{ errors.terms }</p>}

        <button 
        type= 'submit'
        >Submit</button>
      </Form>

      {/* map over data and display here */}

    </div> /**end formCont */
  )
}//end LogInForm

const FormikLogInForm = withFormik({
  // mapPropsToValues
  // form values go here
  // obj{} as props
  mapPropsToValues({ name, email, password, terms }) {
    return {// returns an obj
      name: name || '',
      email: email || '',
      password: password || '',
      terms: terms || false
    }
  },
  //validationSchema
  //'shape' is an obj
  validationSchema: Yup.object().shape({
    name: Yup.string().min(3).max(24).required(),
    email: Yup.string().email().min(12).max(24).required(),
    password: Yup.string().min(9).max(24).required(),
    terms: Yup.bool().required()
  }),
  //handleSubmit
  // props: form values, {formikBag destructured methods}
  handleSubmit(values, {resetForm, setStatus}){
    console.log('submitting', values);
    //axios
    axios
    .post('https://reqres.in/api/users', values)
    .then(res => {
      console.log('res: ',res);
    })
    .catch(err => {
      console.log(err.response);
    })
  }



})(LogInForm);

export default FormikLogInForm;
