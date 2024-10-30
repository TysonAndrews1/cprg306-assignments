
"use client"
import { useState } from "react"
import NewItem from "./new-item"
import ItemList from "./item-list";
import React from "react";
import jsonItems from "./items.json"
import MealIdeas from "./meal-ideas"
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
    const[name, setName] = useState("")
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState("produce")
    const [ingredient, setIngredient] =useState("null")
    
    let listOfItems = [...items]

    const handleSubmit = (event,name,quantity,category) =>{
    event.preventDefault()
    const newItem = {
        id: `${generateRandomString(15)}`,
        name:`${name}`,
        quantity:`${quantity}`,
        category:`${category}`
    }
    listOfItems.push(newItem)
    setItems(listOfItems)
}
    const handleMealSuggest = (inputIngredient) =>{
        setIngredient(inputIngredient)
    }

   const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity); // Update the quantity state
  };
  return (
    <main className="flex flex-col md:flex-row items-start justify-center min-h-screen p-4">
        {/* New Item Column */}
        <div className="flex-1 mb-4 md:mb-0 md:mr-4 bg-slate-600 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-2">New Item</h2>
            <form
                className="p-6 rounded-lg shadow-md bg-slate-500"
                onSubmit={(e) => handleSubmit(e, name, quantity, category)}
            >
                <div>
                    <p className="text-white">Name:</p>
                    <input
                        className="text-slate-500 p-2 rounded"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <NewItem onQuantityChange={handleQuantityChange} />
                <div>
                    <p className="text-white">Category:</p>
                    <select
                        className="text-slate-500 p-2 rounded"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="produce">Produce</option>
                        <option value="dairy">Dairy</option>
                        <option value="bakery">Bakery</option>
                        <option value="meat">Meat</option>
                        <option value="frozen foods">Frozen Foods</option>
                        <option value="canned goods">Canned Goods</option>
                        <option value="dry goods">Dry Goods</option>
                        <option value="beverages">Beverages</option>
                        <option value="snacks">Snacks</option>
                        <option value="household">Household</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">Submit</button>
                </div>
            </form>
            <div className="flex-2 m-3 bg-slate-700 p-5 rounded-2xl">
                <p className="text-white">Name: {name} Quantity: {quantity} Category: {category}</p>
            </div>
        </div>

        {/* Item List Column */}
        <div className="flex-1 mb-4 md:mb-0 md:mr-4 bg-slate-600 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-2">Item List</h2>
            <ItemList items={listOfItems} handleIngredientSelect={handleMealSuggest} />
        </div>

        {/* Meal Items Column */}
        <div className="flex-1 bg-slate-600 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-2">Meal Items</h2>
            <MealIdeas ingredient={ingredient} />
        </div>
    </main>
);
}
