import React from "react";

export default function Item({name,quantity,category,click}) {
    return <li className="flex items-center justify-between bg-slate-700 text-white rounded-lg p-4 my-2 hover:bg-slate-800 transition duration-200" 
    onClick={() => click(name)}>{name} Buy {quantity} In {category}</li> 
 }
