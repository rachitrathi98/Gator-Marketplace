import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import FileBase64 from 'react-file-base64';

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
    console.log(obj)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <div>
                <input type="text" className="input-field"
                onChange={e => setItem({ ...item, title: e.target.value })}
                />
                <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }) => setItem({ ...item, image: base64 })}
                />
            </div>
            <div className="form-group col">
              <label>Title</label>
              <Field
                title="Prodct Title"
                name="title"
                type="text"
                className={'form-control'}
              />
            </div>
            <div className="form-group col">
              <label>Description</label>
              <Field
                name="description"
                type="text"
                className={'form-control'}
              />
            </div>

            <div className="form-group col">
              <label>Cost</label>
              <Field
                name="cost"
                type="number"
                placeholder="$"
                className={'form-control'}
              />
            </div>
            <div className="form-group col">
              <label>Tags</label>
              <Field name="tags" as="select" className={'form-control'}>
                <option selected value=""></option>
                <option value="furniture">Furniture</option>
                <option value="stationary">Stationary</option>
                <option value="kitchen">Kitchen</option>
                <option value="electronics">Electronics</option>
              </Field>
            </div>
            <div className="form-group col">
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
            <div className="form-group">
              <button
                type="submit"
                // disabled={isSubmitting}
                className="btn btn-primary"
              >
    
                Add Listing
              </button>
            </div>
          </Form>
    </Formik>
  );
}

export default ProductListing ;
