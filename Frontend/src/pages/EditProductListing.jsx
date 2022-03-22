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
        setItem(values.image)

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
}
  export default EditProductListing;
