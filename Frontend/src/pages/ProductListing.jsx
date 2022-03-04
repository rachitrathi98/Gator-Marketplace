import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import FileBase64 from 'react-file-base64';
import '../app.css';
import NavbarPlain from '../components/NavbarPlain';
//import { userService } from '../_services';

const ProductListing = () => {
const [item, setItem] = useState('');
  const initialValues = {
    title: '',
    description: '',
    cost: '',
    tags: '',
    location: '',
  };

  function onSubmit(fields) {
    const obj ={...fields}
    obj.image = item.image
    alert("Uploaded Successfully!")
    console.log(obj) 
  }

  return (
    <><NavbarPlain/>
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form >
          <div>
            <h1><center>Enter Product Details</center></h1>
            <div className = "form-group col">
             <label>Upload Product Images 
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
            <div className="form-group col col-4">
              <label>Title</label>
              <Field
                title="Product Title"
                id="title"
                name="title"
                type="text"
                className={'form-control'}
              />
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
            </div>

            <div className="form-group col col-3">
              <label>Cost</label>
              <Field
                name="cost"
                id = "cost"
                type="number"
                placeholder="$"
                className={'form-control'}
              />
            </div>
            <div className="form-group col col-4">
              <label>Tags</label>
              <Field name="tags" as="select" className={'form-control'}>
                <option selected value=""></option>
                <option value="furniture">Furniture</option>
                <option value="stationary">Stationary</option>
                <option value="kitchen">Kitchen</option>
                <option value="electronics">Electronics</option>
              </Field>
            </div>
            <div className="form-group col col-4">
              <label>Location</label>

              <Field name="location" as="select" className={'form-control'}>
                <option selected value=""></option>
                <option value="gainesville">Gainesville</option>
                <option value="ocala">Ocala</option>
                <option value="hawthorne">Hawthorne</option>
                <option value="highsprings">High Springs</option>
                <option value="crosscreek">Cross Creek</option>
                <option value="melrose">Melrose</option>
              </Field>
            </div>
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
    </Formik></>
  );
}

export default ProductListing ;
