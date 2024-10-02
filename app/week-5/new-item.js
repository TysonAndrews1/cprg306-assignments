"use client"
import React from "react"
import { useState, useEffect } from "react"



export default function NewItem ({onQuantityChange}){
    function increment(){
        if (quantity<20) {
            setQuantity(quantity+1)
        }
        
    }
    function decrement(){
        if (quantity >1) {
            setQuantity(quantity-1)
        }
        
    }

    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
      onQuantityChange(quantity); // Call the prop function whenever quantity changes
    }, [quantity, onQuantityChange]);
  
    return (<div> 
        <p className=" w-100 font-bold" >Quantity: {quantity}</p>
        <div className=" flex w-full  align-center">
        <button type="button" className=" bg-green-500 rounded-xl mr-4 w-24 " onClick={increment}>increment </button>
        <button type="button" className=" bg-red-500 rounded-xl w-24" onClick={decrement}>decrement</button>
        </div>
    </div>
    )
};