module.exports = (x, y, callback) => {   // here we have to module.exports instead of exports
    if (x <= 0 || y <= 0) {
        callback(new Error(`Rectangle dimensions must be greater than zero. Received: ${x}, ${y}`))
    } else {
        setTimeout(() =>
            callback(null, {  // here null is if there is no error
                perimeter:() => 2* (x + y),
                area: () => x * y  
            }),2000)
    }

    }



