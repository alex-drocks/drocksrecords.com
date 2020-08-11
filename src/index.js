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
    registerAutoBackgroundChanger();
}

function registerAutoBackgroundChanger() {
    let backgroundIndex = 0;
    const backgrounds = [bg1, bg2, bg3];

    document.body.style.backgroundImage = `url('${backgrounds[backgroundIndex]}')`;
    setInterval(autoChangeBackgroundImg, 2300);

    function autoChangeBackgroundImg() {
        backgroundIndex = backgroundIndex >= (backgrounds.length - 1) ? 0 : backgroundIndex + 1;
        document.body.style.backgroundImage = `url('${backgrounds[backgroundIndex]}')`;
    }
}
