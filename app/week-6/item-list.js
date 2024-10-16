"use client";
import Item from "./item.js"
import {useState} from "react"
import items from "./items.json"
import { loadGetInitialProps } from "next/dist/shared/lib/utils";


function removeDupKeepLength(arr) {
  const result = Array(arr.length).fill(false); // Initialize with false
  const seen = new Set(); // Set to track unique values

  arr.forEach((value, index) => {
      if (!seen.has(value)) {
          seen.add(value);
          result[index] = value; // Keep the value if it's unique
      } else {
          result[index] = false; // Mark as false if it's a duplicate
      }
  });

  return result;
}

export default function ItemList(){
let sorted = [...items]
let categoryList = [...sorted]

const [sortBy, setSortBy] = useState('name')

switch (sortBy) {
  case 'name':
    sorted.sort(function(a, b){
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
    break;
  case 'quantity':
  sorted.sort((a,b) =>a.quantity-b.quantity)
    break;
    case 'category':
      sorted.sort(function(a, b){
        let x = a.category.toLowerCase();
        let y = b.category.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
      break;
      case"grouped Category":
      console.log(categoryList);
      sorted.sort(function(a, b){
        let x = a.category.toLowerCase();
        let y = b.category.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
      categoryList = [...sorted].map((item)=>(item.category))
      categoryList = removeDupKeepLength(categoryList);
      
      break;
}

return (
  
  <div>
    <p>Sorting By {sortBy}</p>
        
    <button onClick={() => setSortBy("name")}>Name </button>
  
    <button onClick={() => setSortBy("category")}>Category </button>
    
    <button onClick={() => setSortBy("quantity")}>Quantity </button>
    
    <button onClick={() => setSortBy("grouped Category")}>Grouped Category </button>    
    {sortBy !== "grouped Category" ? (
      sorted.map((item) => (
        <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
      ))
    ) : (
      sorted.map((item, index) => (
        categoryList[index] === false ? (
          <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
        ) : (
          <div key={item.id}>
            <label className="capitalize" >{categoryList[index]}</label>
            <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
          </div>
        )
      ))
    )}

  </div>
)}