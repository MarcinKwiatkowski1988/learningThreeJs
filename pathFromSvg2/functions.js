Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    var toReturn = true;
    if (!array)
        toReturn = false;

    // compare first lengths since can save a lot of time 
    if (this.length != array.length)
        toReturn =  false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                toReturn =  false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            toReturn =  false;   
        }           
    }       
    return toReturn;
}   