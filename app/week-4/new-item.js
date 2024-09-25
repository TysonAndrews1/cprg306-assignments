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
        <p>Count: {quantity}</p>
        <button className="flex-1 w-24" onClick={increment}>increment </button>
        <button className="flex-2" onClick={decrement}>decrement</button>
    </div>
    )
};