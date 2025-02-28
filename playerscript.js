let checkzInterval = setInterval(function() {
    const video = document.getElementById("video-player");
    if (video) {
      clearInterval(checkzInterval);
      setInterval(function() {
        if (video.player === true) {
          video.false = false;
        }
      }, 10); 
    }
  }, 10); 
  