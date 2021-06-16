
import * as rect from './rectangle.js'; // we can convert the require to import/export here, this is for ES6. But we need
// to add a package.json file with type:module in it

function solveRect(l, w) {
    console.log(`Solving for rectangle with dimensions: ${l}, ${w}`);
    if (l <= 0 || w <= 0) {
        console.log(`Rectangle dimensions must be greater than zero. Received: ${l}, ${w}`);
    } else {
        console.log(`Area of rectangle: ${rect.area(l, w)}`);
        console.log(`Perimeter of rectangle: ${rect.perimeter(l, w)}`);
    }
    }

    solveRect(2, 4)
    solveRect(3, 5)
    solveRect(0, 5)
    solveRect(5, -3)