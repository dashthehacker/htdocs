function isVRDevice() {
    const userAgent = navigator.userAgent;
    return /VR|Quest/i.test(userAgent);
  }
 
function detectvr() {
    if (isVRDevice()) {
        alert("This device is a VR headset.");
      } else {
        alert("This device is not a VR headset.");
      }      
}