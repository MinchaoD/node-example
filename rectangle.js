export function perimeter(x, y) {
   return 2* (x + y) }
// seems like we can not use arrow function here like previous. 
export function area(x, y) {
    return x * y }

// we can convert the require to import/export here, this is for ES6. But we need
// to add a package.json file with type:module in it
