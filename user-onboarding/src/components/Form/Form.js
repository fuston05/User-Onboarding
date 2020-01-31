import React, {useState, useEffect} from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

//styles
import './form.css';

// bring in props from withFormik as an obj{}
const LogInForm = ( { values, errors, touched, status } ) => {
  const [users, setUsers]= useState([]);

  useEffect(() => {
    
  status && setUsers( users => [ ...users, status ] );
    
  }, [status])

  return (
    <div className= 'formCont'>

      <Form>
        <h3>Add User</h3>
        <div className= 'inputCont'>
          <label>Name:
            <Field 
            name= 'name' 
            placeholder= 'Name'
            />
          </label>
          {/* Yup error handling */}
        {touched.name && errors.name && <p className= 'errors'>{ errors.name }</p>}
        </div>

        

        <div className= 'inputCont'>
          <label>Email:
            <Field 
            name= 'email'
            type= 'email' 
            placeholder= 'Email'
            />
          </label>
          {/* Yup error handling */}
        {touched.email && errors.email && <p className= 'errors'>{ errors.email }</p> }
        </div>

         

        <div className= 'inputCont'>
          <label>Password:
            <Field 
            name= 'password'
            type= 'password' 
            placeholder= 'Password'
            />
          </label>
          {/* Yup error handling */}
        {touched.password && errors.password && <p className= 'errors'>{ errors.password }</p>}
        </div>

         

        <div className= 'inputCont'>
          <label>Terms of Service:
            <Field 
            check= {values.terms.toString()}
            name= 'terms'
            type= 'checkbox' 
            />
          </label>
           {/* Yup error handling */}
        {touched.terms && errors.terms && <p className= 'errors'>{ errors.terms }</p>}
        </div>

        

        <button 
        type= 'submit'
        >Submit</button>
      </Form>

      {/* map over data and display here */}
      <div className= 'userCont'>
      {
        users.map( user => {
          return(
            <div className= 'card' key= {user.id}>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.password}</p>
              <p>Terms if Service Accepted: {user.terms.toString()}</p>
            </div>
          )
        } )
      }
      </div>

    </div> /**end formCont */
  )
}//end LogInForm

const FormikLogInForm = withFormik({
  // mapPropsToValues
  // form values go here
  // obj{} as props
  mapPropsToValues({ name, email, password, terms }) {
    return {// returns an obj
      name: name || 'scott fuston',
      email: email || 'fuston@email.com',
      password: password || 'Monkey123!',
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
    // console.log('submitting', values);
    //axios
    axios
    .post('https://reqres.in/api/users', values)
    .then(res => {
      // console.log('res: ', res.data);
      setStatus(res.data);
      resetForm();
    })
    .catch(err => {
      console.log(err.response);
    })
  }



})(LogInForm);

export default FormikLogInForm;
