// Function that logs name and age
function personInfo() {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  }
  
  // Create an object with name and age
  let person = {
    name: "John",
    age: 30
  };
  
  // Use call() to invoke personInfo with 'person' as the context
  personInfo.call(person);
  