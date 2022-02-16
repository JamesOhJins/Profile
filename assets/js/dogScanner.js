// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "my_model/";
let model, webcam, labelContainer, maxPredictions;
const modelURL = URL + "model.json";
const metadataURL = URL + "metadata.json";
model = tmImage.load(modelURL, metadataURL);
scanButton = document.getElementById('scan-button');
loading = document.getElementById('loading');
webcamContainer = document.getElementById("webcam-container");
labelContainer = document.getElementById("label-container");
dogBreed = document.getElementById("dog-breed");
uploadLabel = document.getElementById("upload-label");
uploadButton = document.getElementById("upload-button");
imgPreview = document.getElementById("output_image")
const flip = false;

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
        // const classPrediction =
        //     console.log(prediction[i].className + ": " + (prediction[i].probability.toFixed(2) * 100) + "%");
        if (prediction[i].probability > 0.90) {
            const dogName = prediction[i].className + ": " + (prediction[i].probability.toFixed(2) * 100) + "%"
            uploadLabel.innerHTML = "Try New Image";
            dogBreed.innerHTML = dogName;
            found = true;
        }
    }
    if (!found) {
        dogBreed.innerHTML = "Found No Match";
        uploadLabel.innerHTML = "Try New Image";
    }
}

// }
// Load the image model and setup the webcam
async function init() {
    if (scanButton.innerHTML == 'Scan My Dog') {
        dogBreed.innerHTML = '';
        uploadButton.style.display = 'none';
        dogBreed.style.display = "none";
        imgPreview.style.display = 'none';
        scanButton.style.width = "100%";
        loading.style.display = 'flex';
        webcam = new tmImage.Webcam(150, 150, flip); // width, height, flip
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        await webcam.setup({ facingMode: "environment" });
        scanButton.innerHTML = 'Stop Scanning';
        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)


        // Convenience function to setup a webcam
        // whether to flip the webcam

        // request access to the webcam


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
        loading.style.display = 'none';
        window.requestAnimationFrame(loop);


        console.log(scanButton.innerHTML);
        labelContainer.style.display = 'initial';
        dogBreed.style.display = 'initial';

        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }
    else if (scanButton.innerHTML == "Re-try") {
        webcamContainer.innerHTML = "";
        dogBreed.innerHTML = '';
        labelContainer.style.display = 'none';
        scanButton.innerHTML = 'Scan My Dog';
        scanButton.style.width = "49%";
        uploadButton.style.display = "inline-block";
    }
    else {
        scanButton.innerHTML = 'Scan My Dog';
        webcamContainer.innerHTML = "";
        labelContainer.style.display = 'none';
        dogBreed.style.display = 'none';
        scanButton.style.width = "49%";
        uploadButton.style.display = "inline-block";
        await webcam.pause();

    }
}

async function loop() {

    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);

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
            const width = (prediction[i].probablity * 100);
            labelContainer.childNodes[i].style.fontsize = 'width%';
        } else {
            labelContainer.childNodes[i].innerHTML = "";
        }
        if (prediction[i].probability == 1) {
            dogBreed.innerHTML = prediction[i].className;
            scanButton.innerHTML = 'Scan New Dog';
            webcam.pause();
        }
    }

}