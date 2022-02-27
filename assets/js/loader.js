
function removeLoader(source) {
    window.addEventListener ("load", function() {
        document.querySelector(".spinner").src = source;
        loader =document.querySelector(".spinner");
        console.log("loading2" + loader.src);
        loader.classList.remove("spinner");
    });
}