class Polygon{
    constructor(side){        
        this.side = side
    }
    perimeter() {
        return this.side.reduce(function add(a,b){return a+b;})
    } 
}
    /*
 * Implement a Polygon class with the following properties:
 * 1. A constructor that takes an array of integer side lengths.
 * 2. A 'perimeter' method that returns the sum of the Polygon's side lengths.
 */

