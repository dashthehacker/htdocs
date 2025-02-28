const currenttheme = document.getElementById("stupid-space-css");

if ("theme" in localStorage) {
    //alert("applying theme");
} else {
    localStorage.setItem("theme", "test");
}
