// Function to create a deep clone
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Example usage
let original = {
  name: "Alice",
  hobbies: ["reading", "traveling"]
};

// Create a deep clone
let clone = deepClone(original);

// Modify the clone
clone.hobbies.push("coding");

// Log both objects to verify
console.log("Original:", original);
console.log("Clone:", clone);
