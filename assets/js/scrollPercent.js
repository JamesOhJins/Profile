const percentLabel = document.querySelectorAll("#percent > li > a");
const percentBar = document.querySelector("#percent")
$(window).on('scroll', function () {
    var s = $(window).scrollTop(),
        d = $(document).height(),
        c = $(window).height();
    var scrollPercent = (s / (d - c)) * 100;
    scrollPercent.toFixed(2);
    percentBar.style.height = (((scrollPercent/3)+3)+"vh");
    percentBar.style.maxHeight = "50vh";
    switch (true) {
        case (scrollPercent < 5): {
            changeColor();
            percentLabel[0].style.color = "#ccc";
            break;
        }

        case (scrollPercent < 19): {
            changeColor();
            percentLabel[1].style.color = "#ccc";
            break;
        }
        case (scrollPercent < 33): {
            changeColor();
            percentLabel[2].style.color = "#ccc";
            break;
        }
        case (scrollPercent < 45): {
            changeColor();
            percentLabel[3].style.color = "#ccc";
            break;
        }
        case (scrollPercent < 59): {
            changeColor();
            percentLabel[4].style.color = "#ccc";
            break;
        }
        case (scrollPercent < 72.5): {
            changeColor();
            percentLabel[5].style.color = "#ccc";
            break;
        }
        case (scrollPercent < 86): {
            changeColor();
            percentLabel[6].style.color = "#ccc";
            break;
        }
        case (scrollPercent < 110): {
            changeColor();
            percentLabel[7].style.color = "#ccc";
            // i++;j++;                        
            break;
        }
        default: {
            break;
        }
    }
    function changeColor() {
        percentLabel.forEach(label => {
            label.style.color = "rgba(255, 255, 255, 0.2)";
        });
    }
   
})