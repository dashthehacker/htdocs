document.addEventListener("DOMContentLoaded", () => {
    const debugValue = localStorage.getItem("debug");
    if (debugValue === null) {
      localStorage.setItem("debug", "false");
      //console.log("Debug key created with default value: false");
    } else if (debugValue === "true") {
      //console.log("Debug mode is enabled!");
      let debugbuttons = {rich : document.createElement('button'), reset : document.createElement('button')};
      debugbuttons.rich.textContent="MONEY";
      debugbuttons.rich.id="debugmoneybtn";
      debugbuttons.reset.textContent="RESET";
      debugbuttons.reset.id="debugresetbutton";;
      const barthingy = document.getElementById("option-buttons");
      barthingy.appendChild(debugbuttons.reset);
      barthingy.appendChild(debugbuttons.rich);
      document.getElementById('debugmoneybtn').addEventListener("click", function() {
        try {earnMoney(999999);} catch {}
      });
      document.getElementById('debugresetbutton').addEventListener('click', function() {
        if (confirm("Do you wanna forget everything?")) {
            localStorage.removeItem("virtualPetSave");
            localStorage.removeItem("green");
            localStorage.removeItem("debug");
        }
      });
    } else if (debugValue !== "false") {
      localStorage.setItem("debug", "false");
      //console.log("Invalid debug value detected. Resetting to default: false");
    } else {
      //console.log("Debug mode is disabled.");
    }
  });
  