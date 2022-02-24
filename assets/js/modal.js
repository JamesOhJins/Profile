const images = document.querySelectorAll(".gallery__item img");
let imgSrc;
// get images src onclick
let i = 0;
function getSource() {
    imgSrc = images[i].src;
}
images.forEach((img, j) => {
    img.addEventListener("click", (e) => {
        imgSrc = e.target.src;
        i = j;
        getSource();
        //run modal function
        imgModal(imgSrc);
    });
});
//creating the modal
let imgModal = (src) => {
    const modal = document.createElement("figure");
    modal.setAttribute("class", "modal");
    //add the modal to the main section or the parent element
    window.document.removeEventListener("keydown", handler);
    document.querySelector(".main").append(modal);
    //adding image to modal
    const newImage = document.createElement("img");
    newImage.setAttribute("src", src);
    //creating the close button
    const closeBtn = document.createElement("i");
    closeBtn.setAttribute("class", "fas fa-times closeBtn");
    //close function
    closeBtn.onclick = () => {
        console.log("close button pressed");
        window.document.removeEventListener("keydown", handler);
        modal.remove();
    };
    modal.append(newImage, closeBtn);

    modalImg = document.querySelector(".modal img");
    modalImg.onclick = () => {
        console.log("modalimg is pressed");
        if (i < images.length - 1) {
            i++;
            console.log(i);
            modal.remove();
            newImage.removeAttribute("src", imgSrc);
            getSource();
            newImage.removeAttribute("src");
            newImage.setAttribute("src", imgSrc);
            modal.append(newImage);
            document.querySelector(".main").append(modal);
            return;
        }
    }
    var handler = function (e) {
        switch (e.keyCode) {
            case 27:
                escape();
                // return;
                break;
            case 39:
                if(i<images.length -1) {
                changeModal("right");
                }
                break;
            case 37:
                if(i>0) {
                changeModal("left");
                }
                break;
            default:
                break;
        }

    }
    window.document.addEventListener("keydown", handler);

    function escape() {
        modal.remove();
        modal.removeAttribute("class", "modal");
        newImage.removeAttribute("src", imgSrc);
        closeBtn.removeAttribute("class", "fas fa-times closeBtn");
        window.document.removeEventListener("keydown", handler);
    }

    function changeModal(direction) {
        if (direction == "right" && i < images.length - 1) {
            i++;
        }
        else if (direction == "left" && i > 0) {
            i--;
        }
    
        else { 

        }
        console.log(i);
        modal.remove();
        newImage.removeAttribute("src", imgSrc);
        getSource();
        newImage.removeAttribute("src");
        newImage.setAttribute("src", imgSrc);
        modal.append(newImage);
        document.querySelector(".main").append(modal);
        return;
    
    }
};


