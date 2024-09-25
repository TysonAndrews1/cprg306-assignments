let numbers = [1,2,3,4,5]

let [first, second, third] = numbers;
console.log(first);

// higher order functions == functionseption
let add = function (a,b){
    return a+b;
}
let subtract = function (a,b){
    return a-b
}
let calculate = function(a,b,operation){
    let result = operation(a,b)
    return result
}
console.log(calculate(1,2,add));
