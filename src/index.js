//index.js
"use strict";

//stylesheets
import index from "./index.css";


//images
import signatureImg from "./images/welcome-signature-logo.png"
import bg1 from "./images/bg1.png";
import bg2 from "./images/bg2.png";
import bg3 from "./images/bg3.png";


window.onload = () => {
    registerListeners();
    background.init();
    signature.init();
}

function registerListeners() {
    const welcome = document.querySelector(".welcome");
    const content = document.querySelector(".content");
    welcome.querySelectorAll("button").forEach((btn) => {
        btn.onclick = () => {
            content.classList.add("shown");
            welcome.classList.add("navbar");

            signature.unregisterAnimation();
        };
    });
}

const background = {
    lazyLoadPlaceholder: document.getElementById("invisibleLazyLoadSrcPlaceholder"),
    images: [bg1, bg2, bg3],
    currIndex: 1,
    image: undefined,
    intervalID: undefined,
    init() {
        //initial background image is loaded now then inside the interval
        background.image = background.images[1];
        document.body.style.backgroundImage = `url('${background.image}')`;
        background.registerAnimation();
        //force immediate animation transition
        background.setImage();

        document.querySelector(".welcome .buttons").style.transform = "translateX(0)";
    },
    registerAnimation() {
        //start animating drop-shadow color
        background.intervalID = setInterval(() => {
            background.setImage();
        }, 3300);
    },
    setImage() {
        background.image = background.getNextImage();
        //force GET image from server before changing the actual visible background:
        background.lazyLoadPlaceholder.src = background.image;
        setTimeout(() => {
            //wait until background image is loaded from network
            document.body.style.backgroundImage = `url('${background.image}')`;
        }, 1500)
    },
    getNextImage() {
        background.currIndex = getNextArrIndex(background.images, background.currIndex);
        console.log(background.currIndex)
        return background.images[background.currIndex];
    },
}

const signature = {
    html: document.querySelector(".welcome .signature"),
    colors: ["1010ff", "dd00ff", "1095ff", "101010", "ff0010", "8080ff"],
    currIndex: -1,
    intervalID: undefined,
    init() {
        signature.html.src = signatureImg;
        signature.setDropShadowColor();
        signature.registerAnimation();

        signature.html.style.transform = "translateY(0)";
    },
    registerAnimation() {
        //start animating drop-shadow color
        signature.intervalID = setInterval(() => {
            signature.setDropShadowColor();
        }, 3000);
    },
    unregisterAnimation() {
        //stop animating drop-shadow color
        clearInterval(signature.intervalID);
        signature.html.style.filter = "none";
    },
    setDropShadowColor() {
        signature.html.style.filter = `
        drop-shadow(0.3rem 0.3rem 0.${Math.floor((Math.random() * 6) + 2)}rem #${signature.getNextColor()})
        `
    },
    getNextColor() {
        signature.currIndex = getNextArrIndex(signature.colors, signature.currIndex);
        return signature.colors[signature.currIndex]
    },
}

function getNextArrIndex(array, currIndex) {
    return currIndex >= array.length - 1 ? 0 : currIndex + 1
}
