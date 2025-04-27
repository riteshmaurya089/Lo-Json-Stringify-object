// Function that multiplies two numbers using apply()
function multiplyNumbers(a, b) {
    function multiply(x, y) {
      return x * y;
    }
  
    // Using apply to call multiply with arguments [a, b]
    return multiply.apply(null, [a, b]);
  }
  
  // Example usage
  console.log(multiplyNumbers(5, 6)); // Output: 30
  