const currenttheme = document.getElementById("stupid-space-css");

document.addEventListener("DOMContentLoaded", () => {
    function themestuff() {
        if ("theme" in localStorage) {
            if (localStorage.getItem("theme") === "space") {
                currenttheme.href = "/themes/space.css";
            } else if (localStorage.getItem("theme") === "matrix") {
                currenttheme.href = "/themes/hacker.css";
            }
        } else {
            localStorage.setItem("theme", "space");
            themestuff();
        }
        
        if (currenttheme.href !== "") {
            try {document.getElementById("hide").remove();} catch{}
        }
    }

    themestuff();
});
