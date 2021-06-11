const rect = require ('./rectangle.js')
    
function solveRect(l, w) {
    console.log(`Solving for rectangle with dimensions: ${l}, ${w}`);
    
    rect(l, w, (err, rectangle) => { // here err, rectangle can all be any name
        if (err) {
            console.log('ERROR', err.message); // here err.message, err can be any name to match the above code, but message can not be anyname
        } else {
            console.log(`Area of rectangle with dimension ${l}, ${w}: ${rectangle.area()}`);  // here inside rectangle.area() we don't need (l, w), because it can get the data from the outer function
            console.log(`Perimeter of rectangle with dimension ${l}, ${w}: ${rectangle.perimeter()}`);
        }
    });
    console.log('This statement is logged after the call to rect()') // this code can be logged out before the timeout 2000 
    }

    solveRect(2, 4)
    solveRect(3, 5)
    solveRect(0, 5)
    solveRect(5, -3)


    // below are the results after running the above code: which shows while waiting for timeout 2000, 
    //other tasks can be done, like console.log('This statement is logged after the call to rect()') and other solveRect function
    // timeout 2000 callback will be last to execute

// Solving for rectangle with dimensions: 2, 4
// This statement is logged after the call to rect()
// Solving for rectangle with dimensions: 3, 5
// This statement is logged after the call to rect()
// Solving for rectangle with dimensions: 0, 5
// ERROR Rectangle dimensions must be greater than zero. Received: 0, 5
// This statement is logged after the call to rect()
// Solving for rectangle with dimensions: 5, -3
// ERROR Rectangle dimensions must be greater than zero. Received: 5, -3
// This statement is logged after the call to rect()
// Area of rectangle with dimension 2, 4: 8
// Perimeter of rectangle with dimension 2, 4: 12
// Area of rectangle with dimension 3, 5: 15
// Perimeter of rectangle with dimension 3, 5: 16