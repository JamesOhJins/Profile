var oReq = new XMLHttpRequest();
oReq.open("GET", "https://api.currencyapi.com/v3/latest");
oReq.setRequestHeader("apikey", "hYZNFkl1VIrkjntcf4p13M1Zr9IZFeOVm4IrevrL");
oReq.send();
oReq.addEventListener("load", function () {
    myObj = JSON.parse(this.responseText);
    krw = myObj.data.KRW.value.toFixed(2)

    document.querySelector("#jpy").innerHTML = "1 USD : " + myObj.data.JPY.value.toFixed(2) + " JPY"
    document.querySelector("#cny").innerHTML = "1 USD : " + myObj.data.CNY.value.toFixed(2) + " CNY"
    document.querySelector("#krw").innerHTML = "1 USD : " + krw +" KRW";
    if (krw < 1200) {
        document.querySelector("#currency").innerHTML = "EXCHANGE RATE LESS THAN 1200. GET USD NOW!!!";
    }
})