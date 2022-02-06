const images = document.querySelectorAll(".gallery__item img");
let imgSrc;
// get images src onclick
let i = 0;
function getSource(){
    imgSrc = images[i].src;
}
images.forEach((img, j) => {
    img.addEventListener("click", (e) => {
        imgSrc = e.target.src;
        console.log("j: "+j);
        i = j;
        console.log("i: ");
        getSource();
        //run modal function
        imgModal(imgSrc);
        console.log("img clicked");
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
    var handler = function (e) {
                switch (e.keyCode) {
                    case 27:
                        modal.remove();
                        modal.removeAttribute("class", "modal");
                        newImage.removeAttribute("src", imgSrc);
                        closeBtn.removeAttribute("class", "fas fa-times closeBtn");
                        window.document.removeEventListener("keydown", handler);
                        return;
                    case 39:
                        console.log("right is pressed");
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
                        break;
                    case 37:

                        console.log("left is pressed");
                        if (i > 0) {
                            i--;
                            console.log(i);
                            modal.remove();
                            newImage.removeAttribute("src", imgSrc);
                            getSource();
                            newImage.setAttribute("src", imgSrc);
                            modal.append(newImage);
                            document.querySelector(".main").append(modal);
                            return;
                        }
                        break;
                    default:
                        break;
                }
        
            }
            window.document.addEventListener("keydown", handler);
            

};

// const images = document.querySelectorAll(".gallery__item img");
// let imgSrc;
// let i = 0;
// let count = 0;
// // get images src onclick
// clicked();
// function getSource() {
//     imgSrc = images[i].src;
// }
// function clicked() {
    
//     function imgHandler(e) {
        
//         //run modal function
//         imgModal();
//         console.log("img clicked");
//         //return;
//     }
    
//     images.forEach((img) => {
//         if (count > 0) {
//             img.removeEventListener("click", imgHandler);
//             console.log("imgHandler removed");
//         }
//         img.addEventListener("click", imgHandler);

//     });
// }
// //creating the modal
// function imgModal() {
//     count++;
//     console.log("count: " + count);
//     const modal = document.createElement("figure");
//     modal.setAttribute("class", "modal");
//     //add the modal to the main section or the parent element
//     document.querySelector(".main").append(modal);
//     // //adding image to modal
//     const newImage = document.createElement("img");
//     newImage.setAttribute("src", imgSrc);

//     // //creating the close button
//     const closeBtn = document.createElement("i");
//     closeBtn.setAttribute("class", "fas fa-times closeBtn");
//     close(closeBtn);
//     // //close function
//     closeBtn.onclick = () => {
//         console.log("close button pressed");
//         modal.remove();
//         document.removeChild("figure");
//         modal.removeAttribute("class", "modal");
//         newImage.removeAttribute("src", imgSrc);
//         closeBtn.removeAttribute("class", "fas fa-times closeBtn");
//         return;
//     };
//     modal.append(newImage, closeBtn);

//     if (count > 0) {
//         window.document.removeEventListener("keydown", handler);
//         console.log("listener removed");
//     }


//     var handler = function (e) {
//         switch (e.keyCode) {
//             case 27:
//                 modal.remove();
//                 modal.removeAttribute("class", "modal");
//                 newImage.removeAttribute("src", imgSrc);
//                 closeBtn.removeAttribute("class", "fas fa-times closeBtn");
//                 return;
//             // case 39:
//             //     console.log("right is pressed");
//             //     if (i < images.length - 1) {
//             //         i++;
//             //         console.log(i);
//             //         modal.remove();
//             //         newImage.removeAttribute("src", imgSrc);
//             //         getSource();
//             //         newImage.removeAttribute("src");
//             //         newImage.setAttribute("src", imgSrc);
//             //         modal.append(newImage);
//             //         document.querySelector(".main").append(modal);
//             //         return;
//             //     }
//             //     break;
//             // case 37:

//             //     console.log("left is pressed");
//             //     if (i > 0) {
//             //         i--;
//             //         console.log(i);
//             //         modal.remove();
//             //         newImage.removeAttribute("src", imgSrc);
//             //         getSource();
//             //         newImage.setAttribute("src", imgSrc);
//             //         modal.append(newImage);
//             //         document.querySelector(".main").append(modal);
//             //         return;
//             //     }
//             //     break;
//             default:
//                 break;
//         }

//     }
//     window.document.addEventListener("keydown", handler);
// }
