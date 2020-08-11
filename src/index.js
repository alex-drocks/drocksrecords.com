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
    document.querySelector(".welcome .signature").src = signatureImg;
    initBackgroundChangerClosure();
}

function initBackgroundChangerClosure() {
    let backgroundIndex = 0;
    const backgrounds = [bg1, bg2, bg3];
    const lazyLoadPlaceholder = document.getElementById("invisibleLazyLoadSrcPlaceholder");
    //initial background image is loaded now then inside the interval
    document.body.style.backgroundImage = `url('${backgrounds[backgroundIndex]}')`;
    setInterval(function backgroundChangerClosure() {

        backgroundIndex = backgroundIndex >= (backgrounds.length - 1) ? 0 : backgroundIndex + 1;
        const img = backgrounds[backgroundIndex];
        //force GET image from server before changing the actual visible background:
        lazyLoadPlaceholder.src = img;
        setTimeout(() => {
            //wait until background image is loaded from network
            document.body.style.backgroundImage = `url('${img}')`;
        }, 1000)

        const signature = document.querySelector(".welcome .signature");
        signature.style.filter = `drop-shadow(0.3rem 0.3rem 0.4rem hsla(${Math.random() * 360}, 100%, 48%, ${Math.random()}))`;
    }, 2300);
}
