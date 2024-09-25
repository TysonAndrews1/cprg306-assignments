import React from "react";
import Page from "./week-2/page";
import Link from "next/link";

export default function main(){
    return(
    <div>
    <h1>
        CPRG 306: Web Development 2 - Assignments
    </h1>
    <Link href="http://localhost:3000/week-2">Week-2</Link>
    <Link href="http://localhost:3000/week-3">Week-3</Link>
    </div>
    )
}
