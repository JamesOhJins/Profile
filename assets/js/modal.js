const images = document.querySelectorAll(".gallery__item img");
let imgSrc;
let i = 0;

function getSource() {
  imgSrc = images[i].src;
  console.log(imgSrc);
}

images.forEach((img, j) => {
  img.addEventListener("click", (e) => {
    imgSrc = e.target.src;
    i = j;
    getSource();
    imgModal(imgSrc);
  });
});

let imgModal = (src) => {
  const modal = document.createElement("figure");
  modal.setAttribute("class", "modal");
  window.document.removeEventListener("keydown", handler);
  document.querySelector(".main").append(modal);

  const newImage = document.createElement("img");
  newImage.setAttribute("src", src);

  const closeBtn = document.createElement("i");
  closeBtn.setAttribute("class", "fas fa-times closeBtn");
  closeBtn.onclick = () => {
    console.log("close button pressed");
    window.document.removeEventListener("keydown", handler);
    modal.remove();
  };

  modal.append(newImage, closeBtn);

  modal.addEventListener("click", (event) => {
    if (!event.target.closest("img")) {
      console.log("CLICKED");
      window.document.removeEventListener("keydown", handler);
      modal.remove();
    }
  });

  modalImg = document.querySelector(".modal img");
  modalImg.onclick = () => {
    console.log("modalimg is pressed");
    if (i < images.length - 1) {
      i++;
      getSource();
      newImage.setAttribute("src", imgSrc);
    }
  }

  var handler = function (e) {
    switch (e.keyCode) {
      case 27:
        escape();
        break;
      case 39:
        if (i < images.length - 1) {
          changeModal("right");
        }
        break;
      case 37:
        if (i > 0) {
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
    } else if (direction == "left" && i > 0) {
      i--;
    }
    getSource();
    newImage.setAttribute("src", imgSrc);
  }
};
