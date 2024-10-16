import React from "react";

export default function Item({name,quantity,category}) {
    return <li className="flex-1 text-blue-600 rounded hover:text-blue-300 xl:to-30% py-2 bg-blue-950 my-5 h-12 w-96">{name} Buy {quantity} In {category}</li> 
 }
