//index.js
"use strict";

//scripts
import {Nav} from "./lib/nav";

//stylesheets
import "./lib/base.css";
import "./index.css";
import "./lib/media-queries.css";
import "./lib/nav.css";

//images
import "./images/favicon.png";
import "./images/welcome-signature-logo.png";
import bg1 from "./images/bg1.png";
import bg2 from "./images/bg2.png";
import bg3 from "./images/bg3.png";


window.onload = () => {
    initialize();
}

function initialize() {
    backgroundImageChanger.init();
    animations.init();

    //welcome div
    const welcome = document.querySelector(".welcome");
    welcome.classList.add("initialized");

    //define language from which button was clicked
    (function registerEventListeners() {
        const punchLine = welcome.querySelector(".punch-line");
        const signature = welcome.querySelector(".signature");

        //reload page on signature position clicks
        // (necessary right now because of bad design and z-index crap with the content)
        window.onclick = (e) => {
            const signaturePos = signature.getBoundingClientRect();
            if ((e.clientX <= (signaturePos.x + signaturePos.width) && e.clientX >= signaturePos.x)
                && e.clientY <= signaturePos.y + signaturePos.height && e.clientY >= signaturePos.y) {
                // console.log(e)
                // console.log(signaturePos)
                window.location.href = "./"
            }
        };
        //enter site by selecting a language
        welcome.querySelectorAll("button").forEach((btn) => {
            btn.onclick = function showContent() {
                const contentLang = btn.dataset.lang;
                const content = setSelectedLanguageContent(contentLang);
                content.classList.add("shown"); //show the actual content in the right language

                welcome.classList.add("has-been-clicked");
                animations.unregisterSignatureAnimation();

                //create right-side navbar-like price rates
                welcome.style.opacity = "0"; //trigger CSS opacity transition
                signature.style.display = "none";
                setTimeout(() => {
                    //smooth switch signature to left side of screen
                    signature.style.display = "";
                    welcome.style.justifyContent = "flex-start" //brutal change only at opacity of 0%
                    welcome.style.opacity = "1"
                    welcome.style.backgroundColor = "transparent";

                    //"Mixage, composition et formation audio..."
                    punchLine.style.display = "block";
                    setTimeout(() => {
                        punchLine.classList.add("shown");
                        document.body.style.height = "";
                        document.body.style.overflowY = "auto";
                        const priceNavBar = new Nav();
                        setTimeout(() => {
                            priceNavBar.btn.classList.add("shown");
                        }, 500)
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
                        if (language === "francais") {
                            punchLine.textContent = "Mixage, production musicale et formation audio...";
                        } else if (language === "english") {
                            punchLine.textContent = "Mixing, Music Production and Audio Courses...";
                        }
                    }
                }
            };
        });

        //content cards actions
        document.querySelectorAll(".card").forEach((card) => {
            card.querySelector("button").onclick = toggleCardVisibility;

            function toggleCardVisibility() {
                card.classList.add("selected");
                card.scrollIntoView({behavior: "smooth"})
            }

            const externLink = card.querySelector("a");
            if (externLink) {
                externLink.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openInNewTab(externLink.href);
                }
            }
        });
    })();
}

const backgroundImageChanger = {
    lazyLoadPlaceholder: document.getElementById("invisibleLazyLoadSrcPlaceholder"),
    images: [bg1, bg2, bg3],
    currIndex: 1,
    image: undefined,
    intervalID: undefined,
    init() {
        //initial background image is loaded now then inside the interval
        backgroundImageChanger.image = backgroundImageChanger.images[1];
        document.body.style.backgroundImage = `url('${backgroundImageChanger.image}')`;
        backgroundImageChanger.registerAnimation();
        //force immediate animation transition
        backgroundImageChanger.setImage();
    },
    registerAnimation() {
        //start animating drop-shadow color
        backgroundImageChanger.intervalID = setInterval(() => {
            backgroundImageChanger.setImage();
        }, 3000);
    },
    setImage() {
        backgroundImageChanger.image = backgroundImageChanger.getNextImage();
        //force GET image from server before changing the actual visible background:
        backgroundImageChanger.lazyLoadPlaceholder.src = backgroundImageChanger.image;
        setTimeout(() => {
            //wait until background image is loaded from network
            document.body.style.backgroundImage = `url('${backgroundImageChanger.image}')`;
        }, 2000)
    },
    getNextImage() {
        backgroundImageChanger.currIndex = getNextArrIndex(backgroundImageChanger.images, backgroundImageChanger.currIndex);
        return backgroundImageChanger.images[backgroundImageChanger.currIndex];
    },
}

const animations = {
    html: {
        signature: document.querySelector(".welcome .signature"),
        bgFx: document.querySelector(".welcome .background-fx"),
    },
    colors: ["1010ff", "cc00ff", "1095ff", "101010", "ff0010", "8080ff"],
    currIndex: -1,
    intervalID: undefined,
    shouldAnimateSignature: true,
    init() {
        animations.setNewColor();
        animations.registerAnimationTimer();
    },
    registerAnimationTimer() {
        //start animating drop-shadow color
        animations.intervalID = setInterval(() => {
            animations.setNewColor();
        }, 3000);
    },
    unregisterSignatureAnimation() {
        animations.shouldAnimateSignature = false;
        animations.html.signature.style.filter = "none";
        animations.html.bgFx.style.borderTopColor = "var(--blue)";
    },
    setNewColor() {
        const newColor = getNextColor();

        //set signature logo contour color (drop-shadow)
        if (animations.shouldAnimateSignature) {
            animations.html.signature.style.filter = `
            drop-shadow(0.3rem 0.3rem 0.${Math.floor((Math.random() * 6) + 2)}rem #${newColor})`;
        }

        //set parallel bg lines color async with delayed timers
        setTimeout(() => {
            animations.html.bgFx.style.borderTopColor = `#${newColor}`;
            setTimeout(() => {
                animations.html.bgFx.style.borderBottomColor = `#${newColor}`;
            }, 1700)
        }, 500)

        //closure
        function getNextColor() {
            animations.currIndex = getNextArrIndex(animations.colors, animations.currIndex);
            return animations.colors[animations.currIndex]
        }
    },
}

function getNextArrIndex(array, currIndex) {
    return currIndex >= array.length - 1 ? 0 : currIndex + 1
}

function openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
}
