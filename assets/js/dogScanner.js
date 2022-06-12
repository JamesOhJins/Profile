// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
// the link to your model provided by Teachable Machine export panel
const URL = "assets/data/my_model/";
let model, webcam, labelContainer, maxPredictions;
const modelURL = URL + "model.json";
const metadataURL = URL + "metadata.json";
model = tmImage.load(modelURL, metadataURL);
scanButton = document.getElementById('scan-button');
spinner = document.querySelector('.spinner');
webcamContainer = document.getElementById("webcam-container");
labelContainer = document.getElementById("label-container");
dogBreed = document.getElementById("dog-breed");
uploadLabel = document.getElementById("upload-label");
uploadButton = document.getElementById("upload-button");
imgPreview = document.getElementById("output_image")
dogImage = document.querySelector("#dog");
const flip = false;
var firstTime = true;
var breedFound = false;
var looping = false;
async function preview_image(event) {
    uploadLabel.innerHTML = "Upload Image";
    var reader = new FileReader();
    reader.onload = function () {
        console.log("new image uploaded");
        var output = document.getElementById('output_image');
        output.src = reader.result;
        dogBreed.style.display = 'initial';
        dogBreed.innerHTML = 'loading...';
    }
    reader.readAsDataURL(event.target.files[0]);
    var img = document.getElementById('output_image');
    img.style.display = "initial";
    // webcamContainer.style.display = 'none'
    model = await tmImage.load(modelURL, metadataURL);
    const prediction = await model.predict(img, flip);
    var found = false;
    maxPredictions = model.getTotalClasses();

    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability > 0.01) {
            console.log(prediction[i].className + ": " + (prediction[i].probability.toFixed(2) * 100) + "%");
        }
        if (prediction[i].probability > 0.90) {
            var breed = prediction[i].className;
            const dogName = breed + ": " + (prediction[i].probability.toFixed(2) * 100) + "%"
            if (returnImg(breed) != 0)    {
                img.style.width = "49%";
                getDogByBreed(returnImg(breed));
            }
            else {
                console.log("No Dog IMG")
                img.style.width = "100%";
                clearBreed();
            }
            uploadLabel.innerHTML = "Try New Image";
            dogBreed.innerHTML = dogName;
            found = true;
            return;
        }
    }
    if (!found) {
        dogBreed.innerHTML = "Found No Match";
        uploadLabel.innerHTML = "Try New Image";
        clearBreed()
        return;
    }

}

// }
// Load the image model and setup the webcam
async function init() {
    if (scanButton.innerHTML == 'Scan My Dog' && firstTime) {
        clearBreed();
        dogBreed.innerHTML = '';
        uploadButton.style.display = 'none';
        dogBreed.style.display = "none";
        imgPreview.style.display = 'none';
        scanButton.style.width = "100%";
        // loading.style.display = 'flex';
        spinner.style.display = 'flex';
        webcam = new tmImage.Webcam(150, 150, flip); // width, height, flip
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        await webcam.setup({ facingMode: "environment" });
        scanButton.innerHTML = 'Stop Scanning';
        document.getElementById('webcam-container').appendChild(webcam.webcam); // webcam object needs to be added in any case to make this work on iOS
        // grab video-object in any way you want and set the attributes --> **"muted" and "playsinline"**
        console.log("appending webcam");
        // append elements to the DOM
        console.log("appending player")
        let wc = document.getElementsByTagName('video')[0];
        wc.setAttribute("playsinline", true); // written with "setAttribute" bc. iOS buggs otherwise :-)
        wc.muted = "true"
        wc.id = "webcamVideo";
        await webcam.play();
        looping = true;
        // loading.style.display = 'none';
        spinner.style.display = 'none';
        window.requestAnimationFrame(loop);
        // firstTime = false;
        console.log(scanButton.innerHTML);
        labelContainer.style.display = 'initial';
        dogBreed.style.display = 'initial';
        console.log(model.getClassLabels());
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    else if (scanButton.innerHTML == "Re-try") {
        clearBreed();
        breedFound = false;
        webcamContainer.innerHTML = "";
        dogBreed.innerHTML = '';
        labelContainer.style.display = 'none';
        scanButton.innerHTML = 'Scan My Dog';
        scanButton.style.width = "49%";
        uploadButton.style.display = "inline-block";
    }
    else {
        console.log("default: return to main menu")
        webcam.stop();
        clearBreed();
        breedFound = false;
        scanButton.innerHTML = 'Scan My Dog';
        while (webcamContainer.firstChild) {
            webcamContainer.firstChild.remove();
        }
        console.log("child has been removed");
        labelContainer.style.display = 'none';
        dogBreed.style.display = 'none';
        scanButton.style.width = "49%";
        uploadButton.style.display = "inline-block";
    }
}

async function loop() {
    if(looping){
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + (prediction[i].probability.toFixed(2) * 100) + "%";
        if (prediction[i].probability > 0.15) {
            labelContainer.childNodes[i].innerHTML = classPrediction;
            let prob = prediction[i].probability.toFixed(2) * 100;
            labelContainer.childNodes[i].style.background = "linear-gradient(to right, rgba(51,9,121,1) " + prob + "%, transparent " + (100 - prob) + "%)";
            // labelContainer.childNodes[i].style.width = (prob + "%");
        }
        else {
            labelContainer.childNodes[i].innerHTML = "";
        }
        if (prediction[i].probability == 1) {
            labelContainer.childNodes[i].innerHTML = "";
            var breed = prediction[i].className;
            dogBreed.innerHTML = breed;
            video = document.querySelector("video");
            video.style.width = "49%";
            looping = false;
            if (returnImg(breed) != 0 && !breedFound)    {
                getDogByBreed(returnImg(breed));
                breedFound = true;
            }
            scanButton.innerHTML = 'Scan New Dog';
            webcam.pause();
            return;
        }
    }

}



function returnImg(id) {
    switch (id) {
        case "Affenpinscher":
            return 1;
        case "Alaskan Malamute":
            return 9;
        case "Bichon Frise":
            return 42;
        case "British Bulldog":
            return 0;
        case "Border Collie":
            return 50;
        case "Beagle":
            return 31;
        case "Boxer":
            return 55;
        case "Borzoi":
            return 0;
        case "Bedlington Terrier":
            return 34;
        case "Cavalier King Charles Spaniel":
            return 71;
        case "Chihuahua":
            return 0;
        case "Chow Chow":
            return 81;
        case "Dalmatian":
            return 92;
        case "Dobermann":
            return 94;
        case "Dachshund (Long haired)":
            return 0;
        case "Dachshund (Smooth haired)":
            return 0;
        case "Dachshund (Wire haired)":
            return 0;
        case "French Bulldog":
            return 0;
        case "German Shepherd Dog":
            return 115;
        case "German Shorthaired Pointer":
            return 116;
        case "Golden Retriever":
            return 121;
        case "Great Dane":
            return 124;
        case "Japanese Spitz":
            return 141;
        case "Labrador Retriever":
            return 149;
        case "Maltese":
            return 161;
        case "Papillon":
            return 181;
        case "Poodle (Toy)":
            return 197;
        case "Poodle (Miniature)":
            return 196;
        case "Pug":
            return 201;
        case "Rottweiler":
            return 219;
        case "Shiba Inu":
            return 222;
        case "Samoyed":
            return 214;
        case "St Bernard":
            return 212;
        case "Siberian Husky":
            return 226;
        case "Shih Tzu":
            return 223;
        case "Welsh Corgi":
            return 68;
        case "Yorkshire Terrier":
            return 264;
        default:
            return 0;
    }
}


// Made to demonstrate how to use JQuery and TheDogAPI to load breed list, and show a breed image and data on selection. Any questions hit me up at - https://forum.thatapiguy.com - Aden

// Setup the Controls
// triggered when the breed select control changes
function getDogByBreed(breed_id) {
    ajax_get('https://api.thedogapi.com/v1/images/search?include_breed=1&breed_id=' + breed_id, function (data) {
        if (data.length == 0) {
            // if there are no images returned
            clearBreed();
        } else {
            //else display the breed image and data
            displayBreed(data[0])
        }
    });
}
// clear the image and table
function clearBreed() {
    $('#dog').attr('src', "");
    $("#breed_data_table tr").remove();
}
// display the breed image and data
function displayBreed(image) {
    $('#dog').attr('src', image.url);
    $("#breed_data_table tr").remove();

    var breed_data = image.breeds[0]
  $.each(breed_data, function(key, value) {
    // as 'weight' and 'height' are objects that contain 'metric' and 'imperial' properties, just use the metric string
    if (key == 'weight' || key == 'height') value = value.metric
    // add a row to the table
    if (key.includes('_')){
        key = key.replaceAll('_', ' ');
    }
    if (key != "id" && key != "reference image id") {
        if (key == "weight"){
            value = value + " kg"
        }
        if (key == "height") {
            value = value + " cm"
        }
        key = key.charAt(0).toUpperCase() + key.slice(1) +":  ";
        if (value.includes("Cardigan")){
            value = "Welsh Corgi";
        }
        
        $("#breed_data_table").append("<tr><td>" + key + "</td><td>" + value + "</td></tr>");
    }
  });

}

// make an Ajax request
function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch (err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
