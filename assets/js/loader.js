

function removeLoader(source) {
    window.addEventListener ("load", function() {
        // loader.addAttribute("img");
        // document.querySelector(".spinner > img").src = source;
        //document.querySelector(".spinner").src = source;
        // document.querySelectorAll("img[src='meh.png']");
        // var image = document.querySelector("img[src='"+source+"'");
        console.log("source: " + getAbsoluteUrl(source));
        
        const image = document.querySelector(`.spinner > img[src=${CSS.escape(source)}]`);//".spinner > img[src='"+ CSS.escape(source)+"']");
        // image.src = source;
        // loader = document.querySelector(".spinner");
        image.style.display = "flex";
        console.log("loading2" + image.src);
        console.log("closest spinner is " + image.closest(".spinner"));
        var spinner =  image.closest(".spinner");
        spinner.classList.remove("spinner");
        // loader.classList.remove("img");
        
    });
}

var getAbsoluteUrl = (function() {
    var a;
    return function(url) {
        if(!a) a = document.createElement('a');
        a.href = url;
        return a.href;
    }
})();
   
