"use client";
import Item from "./item.js"
import {useState} from "react"
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

export default function ItemList({items, handleIngredientSelect}){
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
  <div className="p-4">
      <p className="text-gray-800 font-semibold mb-4">Sorting By: {sortBy}</p>
      
      <div className="flex space-x-2 mb-4">
          {["name", "category", "quantity", "grouped Category"].map((sortOption) => (
              <button 
                  key={sortOption}
                  onClick={() => setSortBy(sortOption)} 
                  className={`rounded px-4 py-2 transition duration-200 
                      ${sortBy === sortOption ? 'bg-blue-800 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                  {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
              </button>
          ))}
      </div>

      <div className="mt-4">
          {sortBy !== "grouped Category" ? (
              sorted.map((item) => (
                  <Item 
                      key={item.id} 
                      name={item.name} 
                      quantity={item.quantity} 
                      category={item.category} 
                      click={handleIngredientSelect} 
                  />
              ))
          ) : (
              sorted.map((item, index) => (
                  categoryList[index] === false ? (
                      <Item 
                          key={item.id} 
                          name={item.name} 
                          quantity={item.quantity} 
                          category={item.category} 
                          click={handleIngredientSelect} 
                      />
                  ) : (
                      <div key={item.id} className="mb-2">
                          <label className="capitalize block font-semibold">{categoryList[index]}</label>
                          <Item 
                              key={item.id} 
                              name={item.name} 
                              quantity={item.quantity} 
                              category={item.category} 
                          />
                      </div>
                  )
              ))
          )}
      </div>
  </div>
);
}