

function removeLoader(source) {
    window.addEventListener ("load", function() {
        // loader.addAttribute("img");
        // document.querySelector(".spinner > img").src = source;
        //document.querySelector(".spinner").src = source;
        // document.querySelectorAll("img[src='meh.png']");
        // var image = document.querySelector("img[src='"+source+"'");
        var url = new URL(source);
        if(source.includes(window.location.hostname)){ //path is relative path
        var result = url.pathname;
        result = result.substring(9,result.length); 
        }
        else { //path is abosolute path
            result = url;
        }
        console.log("source: " + result); 
        //source = "assets/images/rashi/Rashi2.jpeg";
        const image = document.querySelector(`.spinner > img[src=${CSS.escape(result)}]`);//".spinner > img[src='"+ CSS.escape(source)+"']");
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


   
