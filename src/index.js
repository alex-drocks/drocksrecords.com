//index.js
"use strict";

//scripts
import {Nav} from "./lib/nav";

//stylesheets
import "./lib/common.css";
import "./index.css";
import "./lib/media-queries.css";
import "./lib/nav.css";

//images
import signatureImg from "./images/welcome-signature-logo.png"
import bg1 from "./images/bg1.png";
import bg2 from "./images/bg2.png";
import bg3 from "./images/bg3.png";


window.onload = () => {
    registerEventListeners();
    background.init();
    colorAnimation.init();
}

function registerEventListeners() {
    //define language from which button was clicked
    let content;

    //welcome buttons actions
    const welcome = document.querySelector(".welcome");
    welcome.querySelectorAll("button").forEach((btn) => {
        btn.onclick = () => {
            const contentLang = btn.dataset.lang;
            content = setSelectedLanguageContent(contentLang);

            content.classList.add("shown");
            welcome.classList.add("has-been-clicked");
            colorAnimation.unregisterAnimation();
            // signature.html.style.display = "none";

            //create right-side navbar like price feature
            new Nav();
            welcome.style.opacity = "0"; //trigger CSS opacity transition
            setTimeout(() => {
                //smooth switch signature to left side of screen
                // signature.html.style.display = "";
                welcome.style.justifyContent = "flex-start" //brutal change only at opacity of 0%
                welcome.style.opacity = "1"
                welcome.style.backgroundColor = "transparent";
                document.querySelector(".welcome .background-fx").style.height = "635px"

                //"Mixage, composition et formation audio..."
                welcome.querySelector(".punch-line").style.display = "block";
                setTimeout(() => {
                    welcome.querySelector(".punch-line").classList.add("shown");
                    document.body.style.height = "";
                    document.body.style.overflowY = "auto";
                }, 200)
            }, 1200);

            function setSelectedLanguageContent(language) {
                const otherHiddenLang = document.querySelector(
                    `.content.lang-${language === "francais" ? "english" : "francais"}`
                );
                otherHiddenLang.remove();
                setPunchLineText(language);
                return document.querySelector(`.content.lang-${language}`);

                function setPunchLineText(language) {
                    const punchLine = document.querySelector(".welcome .punch-line");
                    if (language === "francais") {
                        punchLine.textContent = "Mixage, composition et formation audio...";
                    } else if (language === "english") {
                        punchLine.textContent = "Mixing, composition and audio teaching...";
                    }
                }
            }
        };
    });

    //content cards actions
    document.querySelectorAll(".card").forEach((card) => {
        card.querySelector("button").onclick = () => {
            card.classList.add("selected");
            card.scrollIntoView({behavior: "smooth"})
        };
        const externLink = card.querySelector("a");
        if (externLink) {
            externLink.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                openInNewTab(externLink.href);
            }
        }
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

        document.querySelector(".welcome .background-fx").style.height = "80%"
        document.querySelector(".welcome .buttons").style.transform = "translateX(0)";
    },
    registerAnimation() {
        //start animating drop-shadow color
        background.intervalID = setInterval(() => {
            background.setImage();
        }, 3000);
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
        return background.images[background.currIndex];
    },
}

const colorAnimation = {
    html: {
        signature: document.querySelector(".welcome .signature"),
        bgFx: document.querySelector(".welcome .background-fx"),
    },
    colors: ["1010ff", "dd00ff", "1095ff", "101010", "ff0010", "8080ff"],
    currIndex: -1,
    intervalID: undefined,
    init() {
        colorAnimation.html.signature.src = signatureImg;
        colorAnimation.setDropShadowColor();
        colorAnimation.registerAnimation();
        colorAnimation.html.signature.style.transform = "translateY(0)";
    },
    registerAnimation() {
        //start animating drop-shadow color
        colorAnimation.intervalID = setInterval(() => {
            colorAnimation.setDropShadowColor();
        }, 3000);
    },
    unregisterAnimation() {
        //stop animating drop-shadow color
        clearInterval(colorAnimation.intervalID);
        colorAnimation.html.signature.style.filter = "none";
        colorAnimation.html.bgFx.style.borderTopColor = "var(--blue)";
    },
    setDropShadowColor() {
        const newColor = colorAnimation.getNextColor();

        //set signature logo contour color (drop-shadow)
        colorAnimation.html.signature.style.filter = `
        drop-shadow(0.3rem 0.3rem 0.${Math.floor((Math.random() * 6) + 2)}rem #${newColor})`;

        //set parallel bg lines color async with delayed timers
        setTimeout(() => {
            colorAnimation.html.bgFx.style.borderTopColor = `#${newColor}`;
            setTimeout(() => {
                colorAnimation.html.bgFx.style.borderBottomColor = `#${newColor}`;
            }, 2000)
        }, 700)
    },
    getNextColor() {
        colorAnimation.currIndex = getNextArrIndex(colorAnimation.colors, colorAnimation.currIndex);
        return colorAnimation.colors[colorAnimation.currIndex]
    },
}

function getNextArrIndex(array, currIndex) {
    return currIndex >= array.length - 1 ? 0 : currIndex + 1
}

function openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
}
