import Link from "next/link";

export default function StudentInfo(){
    return <div>
        <MyName/>
        <GitHubLink/>
    </div>;
};

function MyName(){
    return <h1>
        Tyson Andrews
    </h1>;
};

function GitHubLink() {
    return <Link href="https://github.com/TysonAndrews1">GitHub</Link>
}