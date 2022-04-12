import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios"
import "../style/Checkout.css";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";

import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51Km42DFcguTL3wq3vClbU1jxOWdIpEDN8uO85Swjhnx5AYw4e5qFKezTPjjzgV7TJaJt1nd3TVhXgVoC5SqenYBZ00ampqXCpW");

export default function CheckoutListing() {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams()
  const [listing, setListing] = useState({})
  useEffect(async () => {
    // Create PaymentIntent as soon as the page loads

    console.log(id)
    await axios.get("http://localhost:8000/api/get-listing/" + id, {withCredentials: true}).then((res) => {
      setListing(res.data.listing)
    })

    await axios.post("http://localhost:8000/api/create-payment-intent",{withCredentials: true})
      .then((res) => {
          console.log(res.data.clientSecret)
          setClientSecret(res.data.clientSecret)})

  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Checkout">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm listing = {listing}/>
        </Elements>
      )}
       </div>
  );
}