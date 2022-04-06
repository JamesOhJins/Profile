

function removeLoader(source) {
    window.addEventListener("load", function () {

        var url = new URL(source);
        if (source.includes(window.location.hostname) && source.includes("/Profile/")) { //path is relative path
            //for github
            console.log("case github");
            var result = url.pathname;
            console.log(window.location.hostname);
            result = result.substring(9, result.length);
        }
        else if (source.includes(window.location.hostname)) {
            //for local
            console.log("case local");
            var result = url.pathname;
            console.log(window.location.hostname);
            result = result.substring(1, result.length);
        }
        else { //path is abosolute path
            var result = url;
        }
        console.log("source: " + result);
        const image = document.querySelector(`.spinner > img[src=${CSS.escape(result)}]`);
        image.style.display = "flex";
        var spinner = image.closest(".spinner");
        spinner.classList.remove("spinner");

    });
}



