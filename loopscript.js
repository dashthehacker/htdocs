let checkInterval = setInterval(function() {
    // Try to get the video element
    const video = document.getElementById("video-player");
  
    // If the video element exists, clear the first interval
    if (video) {
      clearInterval(checkInterval); // Stop checking for the video element
  
      // Start a new interval to ensure the video loops
      setInterval(function() {
        // If loop is set to false, reset it to true
        if (video.loop === false) {
          video.loop = true;
        }
      }, 10); // Check every 10 milliseconds
    }
  }, 10); // Check every 10 milliseconds for the video element
  