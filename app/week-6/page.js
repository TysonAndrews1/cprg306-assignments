
import ItemList from "./item-list";
import React from "react";

const arr = [1,3,4,6,2,5]

// console.log(arr.sort((a,b) => a-b))
// console.log('hello');





export default function Page() {
    return (

      <main>
        <h1 className="font-bold text-4xl">Shopping List</h1>
        <ItemList/>
      </main>
    );
  } 