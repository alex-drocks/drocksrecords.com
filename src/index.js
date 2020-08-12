//index.js
"use strict";

//stylesheets
import index from "./index.css";


//images
import signatureImg from "./images/welcome-signature-logo.png"
import bg1 from "./images/bg1.png";
import bg2 from "./images/bg2.png";
import bg3 from "./images/bg3.png";
import bg5 from "./images/bg5.png";


window.onload = () => {
    registerListeners();
    initBackgroundChanger();
    initSignatureColorChanger();
}

function registerListeners() {
    const welcome = document.querySelector(".welcome");
    const content = document.querySelector(".content");
    welcome.querySelectorAll("button").forEach((btn) => {
        btn.onclick = () => {
            content.classList.add("shown");
            welcome.classList.add("navbar");
        };
    });
}

function initBackgroundChanger() {
    const backgrounds = [bg1, bg2, bg3, bg5];
    const lazyLoadPlaceholder = document.getElementById("invisibleLazyLoadSrcPlaceholder");

    //initial background image is loaded now then inside the interval
    let img = backgrounds[getRandomIndex(backgrounds)];
    document.body.style.backgroundImage = `url('${img}')`;
    setInterval(function backgroundChangerClosure() {
        img = backgrounds[getRandomIndex(backgrounds)]
        //force GET image from server before changing the actual visible background:
        lazyLoadPlaceholder.src = img;
        setTimeout(() => {
            //wait until background image is loaded from network
            document.body.style.backgroundImage = `url('${img}')`;
        }, 1200)
    }, 3000);
}

function initSignatureColorChanger() {
    const colors = ["000000", "dd00ff", "0000ff", "ffffff", "ff0000"];
    const signature = document.querySelector(".welcome .signature");

    signature.src = signatureImg;
    setInterval(function signatureColorChangerClosure() {
        signature.style.filter = `drop-shadow(0.3rem 0.3rem 0.29rem #${colors[getRandomIndex(colors)]})`;
    }, 3000);
}

function getRandomIndex(arr) {
    return Math.floor(Math.random() * arr.length);
}
