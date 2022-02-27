
function removeLoader() {
    window.addEventListener ("load", function() {
        const loader = document.querySelector(".spinner");
        loader.classList.remove("spinner");
    });
}