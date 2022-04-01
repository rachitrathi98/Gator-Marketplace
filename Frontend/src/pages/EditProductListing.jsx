import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FileBase64 from 'react-file-base64';
import '../app.css';
import NavbarPlain from '../components/NavbarPlain';
import axios from "axios"
import * as Yup from "yup";
import { useParams } from 'react-router-dom';

const EditProductListing = ({props}) => {
const [item, setItem] = useState('');
const {id} = useParams()
const [formValues, setformValues] = useState({})
  const values = {
    title: '',
    description: '',
    price: '',
    tag: '',
    location: '',
    createdBy: '',
    image : ''
  };

  useEffect(async () => {
    
    const resp = await axios.get("http://localhost:8000/api/get-listing/"+id, {withCredentials : true})
     if(resp.data && resp.data.listing)
     {
        const fields = ['title', 'description', 'price', 'tag', 'location', 'createdBy', 'image'];
        fields.forEach(field => {
            values[field] = resp.data.listing[field];
        })
        setformValues(values)
        setItem({...item, image: values.image})

     }
    }, []);

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

    console.log(fields)
    fields.image = item.image
    const resp = await axios.put("http://localhost:8000/api/update-listing/"+id, {...fields}, {withCredentials:true})
    if(resp && resp.data && resp.data.res)
    {
        window.location.href = "http://localhost:3000/home";
    }
  }
  
  return (
    <><NavbarPlain/>
    <Formik initialValues={formValues} validationSchema={ProductRegSchema} onSubmit={onSubmit} enableReinitialize = {true}>
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
              <label>Description</label>
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
              <label>price</label>
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
              <label>tag</label>
              <Field name="tag" as="select" className={'form-control'}>
                <option value="Furniture">Furniture</option>
                <option value="Stationary">Stationary</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Electronics">Electronics</option>
              </Field>
            </div>
             <div className="form-group col col-4">
              <label>Location</label>

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
                Update Listing
              </button>
            </div>
            </div>
          </Form>
    )}
    </Formik>
    </>
  );
}
export default EditProductListing;
