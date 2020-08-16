//nav.js  -  Navigation Menu to be called in pages that needs it

export class Nav {
    constructor() {
        Nav.self = this;
        this.container = document.createElement("nav"); //invisible container
        this.btn = document.createElement("button"); //open close btn
        this.list = document.createElement("ul");
        this.initialize();
    }

    initialize() {
        const nav = Nav.self;

        //set the default content
        (function generateHTML() {
            //<button>
            nav.btn.className = "nav-btn";
            nav.btn.innerHTML = `
<!--            <svg class="nav-btn__icon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2">-->
<!--                <g fill-rule="nonzero"><path d="M283.5 111.9a38.9 38.9 0 11-55 55 38.9 38.9 0 0155-55M283.5 228.5a38.9 38.9 0 11-55 55 38.9 38.9 0 0155-55M283.5 345.1a38.9 38.9 0 11-55 55 38.9 38.9 0 0155-55"></path></g>-->
<!--            </svg>-->
            <svg class="nav-btn__icon" viewBox="0 0 479 479" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"><path d="M317.3 189.5L274.9 136c-7.2-9.1-17.7-15.1-29.2-16.8V91.4c0-3.5-2.9-6.4-6.4-6.4a6.5 6.5 0 00-6.5 6.4v27.7a44.8 44.8 0 00-29 16.8l-42.6 53.7a26.9 26.9 0 00-5.7 16.5v161.1c0 14.6 11.9 26.4 26.5 26.3h114.4a26.4 26.4 0 0026.6-26.2V206.1c0-6-2-11.8-5.7-16.6zm-78-7.5a18.7 18.7 0 110 37.4 18.7 18.7 0 010-37.4zm70.9 185.2c0 7.5-6.2 13.4-13.7 13.4H182c-7.5 0-13.7-5.9-13.7-13.4V206.1c0-3.1 1-6.1 3-8.5l42.4-53.7c4.8-6 11.5-10.2 19-11.7v37.5a31.6 31.6 0 1013 0v-37.5a32.6 32.6 0 0118.9 11.7l42.5 53.6c2 2.5 3 5.5 3 8.6v161.1z" fill-rule="nonzero"/><path d="M259.8 320.1c-2.8-9-11.1-15-20.5-15a8.6 8.6 0 118.6-8.7 6.5 6.5 0 1012.9 0c0-9.4-6.1-17.7-15-20.6V273a6.5 6.5 0 00-12.9 0v2.8a21.6 21.6 0 006.4 42.1 8.6 8.6 0 11-8.7 8.7c0-3.6-2.9-6.5-6.4-6.5a6.5 6.5 0 00-6.5 6.5c0 9.4 6.2 17.7 15.1 20.5v3.3a6.5 6.5 0 0012.9 0V347a21.6 21.6 0 0014.1-27z" fill-rule="nonzero"/></svg>
            `;
            //<ul>
            nav.list.className = "nav-list";
            nav.list.innerHTML = `
            <li class="main-logo" style="opacity: 0">
            <a href="./"><img src="../images/welcome-signature-logo.png" class="logo-link" alt="Logo"></a>
            Mixage, composition et formation audio...
            </li>
            <br>
            <br>
            <br>

<!--            <li class="buttons">-->
<!--                <a href="#"><button data-src="about" tabindex="-1">À propos</button></a>-->
<!--                <a href="#"><button data-src="podcast" tabindex="-1">Podcasts</button></a>-->
<!--                <a href="#"><button data-src="productions" tabindex="-1">Nos productions</button></a>-->
<!--                <a href="#"><button data-src="contact" tabindex="-1">Contactez-nous</button></a>-->
<!--            </li>-->
            
            
                        
            <h1>Tarification pour Mixage:</h1>
            <li>Podcast SOLO. 50$</li>
            <li>Podcast DUO. 75$</li>
            <li>Podcast TRIO. 95$</li>
            <br>
            <br>
            <br>
            <h1>Tarification pour Musique:</h1>
            <li>Single instrumental. 150$</li>
            <li>Single avec voix. 250$</li>
            <li>3 Tounes. 600$</li>
            <li>5 Tounes. 900$</li>
            <br>
            <br>
            <br>
            <li><i class="punch-line" style="color: var(--dark-gray);">© D Rocks Records 2020</i></li>
            `;
        })();

        //insert the <nav> HTML on top of the <body> element
        (function prependToDOM() {
            nav.container.append(nav.btn, nav.list);
            document.body.prepend(nav.container);
        })();

        //start listenning for events
        (function registerListeners() {
            nav.btn.onclick = () => nav.toggleVisibility();
            nav.list.onclick = () => nav.toggleVisibility();
        })();
    }

    toggleVisibility() {
        const topNavBar = document.querySelector(".welcome.has-been-clicked");
        // const content = document.querySelector(".content.shown");
        if (Nav.self.list.classList[1] !== "shown") {
            Nav.self.list.classList.add("shown");
            Nav.self.list.querySelector(".main-logo").style.opacity = "1";

            // content.style.width = `calc(100vw - ${Nav.self.list.offsetWidth}px)`;
            topNavBar.style.opacity = `0`;
        } else {
            Nav.self.list.classList.remove("shown");
            Nav.self.list.querySelector(".main-logo").style.opacity = "0";

            // content.style.width = "100vw";
            topNavBar.style.opacity = `1`;
        }
    }
}
