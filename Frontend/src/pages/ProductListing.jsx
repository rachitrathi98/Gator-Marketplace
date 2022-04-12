import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FileBase64 from 'react-file-base64';
import '../app.css';
import NavbarPlain from '../components/NavbarPlain';
import isAuth from "../helper/auth"
import axios from "axios"
import * as Yup from "yup";

//import { userService } from '../_services';

const ProductListing = () => {
const [item, setItem] = useState('');
  const initialValues = {
    title: '',
    description: '',
    price: '',
    tag: '',
    location: '',
  };

  const ProductRegSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, 'Enter minimum 5 characers')
      .required('Required'),
    description: Yup.string()
    .min(5, 'Enter minimum 5 characers')
    .required('Required'),
      price: Yup.string()
      .min(1, 'Enter a valid price')
      .required('Required'),  
  });

  async function onSubmit(fields) {

    console.log("Hi")
    const obj ={...fields}
    obj.image = item.image
    obj.createdBy = isAuth().email
    obj.seller = isAuth().name
    console.log(obj);
    alert("Uploaded Successfully!");
    if(obj.tag.length && obj.location.length && obj.image)
    {
      const response = await axios.post("http://localhost:8000/api/post-listing", obj, {withCredentials : true})
      if(response.data && response.data.res){
        window.location.href = "http://localhost:3000/home";
      }
    }
    else window.location.href = "http://localhost:3000/Form";
  }

  return (
    <><NavbarPlain/>
    <Formik initialValues={initialValues} validationSchema={ProductRegSchema} onSubmit={onSubmit}>
    {({ errors, touched })  => (
          <Form >
          <div>
            <h1><center>Enter Product Details</center></h1>
           
            <div className="form-group col col-4">
              <label>Title</label>
              <Field
                title="Product Title"
                id="title"
                name="title"
                type="text"
                className={'form-control'}
              />
              <ErrorMessage name="title">
                { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
            </div>
            <div className="form-group col">
              <label>Product Description</label>
              <Field
                rows="3"
                id = "description"
                name="description"
                type="text"
                className={'form-control'}
              />

            <ErrorMessage name="description">
                { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
            </div>

            <div className="form-group col col-3">
              <label>Product Price</label>
              <Field
                name="price"
                id = "price"
                type="text"
                placeholder="$"
                className={'form-control'}
              />
             <ErrorMessage name="price">
                { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
            </div>
            <div className="form-group col col-4">
              <label>Product Category</label>
              <Field name="tag" as="select" className={'form-control'}>
                <option selected value=""></option>
                <option value="Furniture">Furniture</option>
                <option value="Stationary">Stationary</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Electronics">Electronics</option>
              </Field>
            </div>
            <div className="form-group col col-4">
              <label>Seller Location</label>

              <Field name="location" as="select" className={'form-control'}>
                <option selected value=""></option>
                <option value="Gainesville">Gainesville</option>
                <option value="Ocala">Ocala</option>
                <option value="Hawthorne">Hawthorne</option>
                <option value="High Springs">High Springs</option>
                <option value="Cross Creek">Cross Creek</option>
                <option value="Melrose">Melrose</option>
              </Field>
            </div>
            <div className = "form-group col">
             <label>Upload Product Image 
                <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }) => setItem({ ...item, image: base64 })}
                />
                </label>
            </div>
           {item.image ? 
            <div className="card-image">
              <img className="preview" style={{  width: 'auto', height: 150 }} src={item.image} />
            </div>
            : <div></div>
            }
            <div className="form-group col-10">
              <button
                type="submit"
                id = "submitted"
                // disabled={isSubmitting}
                className="btn btn-primary"
              >
    
                Add Listing
              </button>
            </div>
            </div>
          </Form>
    )}
    </Formik></>
  );
}

export default ProductListing ;
