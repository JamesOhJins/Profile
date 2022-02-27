
function removeLoader(source) {
    window.addEventListener ("load", function() {
        // loader.addAttribute("img");
        document.querySelector(".spinner > img").src = source;
        //document.querySelector(".spinner").src = source;
        loader = document.querySelector(".spinner > img");
        // loader = document.querySelector(".spinner");
        loader.style.display = "flex";
        console.log("loading2" + loader.src);
        console.log("closest spinner is " + loader.closest(".spinner"));
        var spinner =  loader.closest(".spinner");
        spinner.classList.remove("spinner");
        // loader.classList.remove("img");
        
    });
}