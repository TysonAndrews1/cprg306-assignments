"use client"
import React from "react"
import { useState } from "react"



export default function NewItem (){
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

    let [quantity, setQuantity] = useState(0)
    return (<div> 
        <p className="  text-center w-100 h-10 font-bold" >Count: {quantity}</p>
        <div className=" flex w-full justify-center align-center">
        <button className=" bg-green-500 rounded-xl mx-8 w-24 " onClick={increment}>increment </button>
        <button className=" bg-red-500 rounded-xl  mx-8 w-24" onClick={decrement}>decrement</button>
        </div>
    </div>
    )
};