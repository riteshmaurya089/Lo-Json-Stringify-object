let loadingInterval = setInterval(function() {
    console.log("Loading...");
  }, 1000);
  
  // Stop the loading after 5 seconds
  setTimeout(function() {
    clearInterval(loadingInterval);
    console.log("Loaded successfully!");
  }, 5000);
  