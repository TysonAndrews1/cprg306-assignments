
"use client"
import { useState } from "react"
import NewItem from "./new-item"
import ItemList from "./item-list";
import React from "react";
import jsonItems from "./items.json"
const arr = [1,3,4,6,2,5]


function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
}






export default function Page() {
    const [items,setItems] = useState([...jsonItems])
    let listOfItems = [...items]
   const[name, setName] = useState("")
   const [quantity, setQuantity] = useState(0);
   const [category, setCategory] = useState("produce")

   const handleSubmit = (event,name,quantity,category) =>{
    event.preventDefault()
    const newItem = {
        id: `${generateRandomString(15)}`,
        name:`${name}`,
        quantity:`${quantity}`,
        category:`${category}`
    }
    console.log(newItem);
    listOfItems.push(newItem)
    setItems(listOfItems)
    console.log(listOfItems);
    
}

   const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity); // Update the quantity state
  };
    return(
        
    <main className="flex items-center justify-center min-h-screen ">
        <ItemList items = {listOfItems}/>
        <form
        className="p-6 rounded-lg shadow-md w-96 space-y-4 bg-slate-500"
        onSubmit={(e) => handleSubmit(e, name, quantity, category)} // Pass quantity here
      >
            <div>
    <p>Name:</p>
    <input className=" text-slate-500" type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
    </div>
    <NewItem onQuantityChange={handleQuantityChange}/>
    <div>
        <p>Category:</p>
    <select className="text-slate-500"  value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value={'produce'}>Produce</option>
        <option value={'dairy'}>Dairy</option>
        <option value={'bakery'}>Bakery</option>
        <option value={'meat'}>Meat</option>
        <option value={'frozen foods'}>Frozen Foods</option>
        <option value={'canned goods'}>Canned Goods</option>
        <option value={'dry goods'}>Dry Goods</option>
        <option value={'beverages'}>Beverages</option>
        <option value={'snacks'}>Snacks</option>
        <option value={'household'}>Household</option>
        <option value={'other'}>Other</option>
    </select>
    </div>
<div>
    <button type="submit" >submit</button>
    </div>
    </form>
    <div className="flex-2 m-3 bg-slate-700 p-5 rounded-2xl" >
    <p>Name: {name} Quantity: {quantity} Category: {category}</p>
    </div>
    </main>
    )
}
