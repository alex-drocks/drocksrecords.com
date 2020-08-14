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
            <svg class="nav-btn__icon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2">
                <g fill-rule="nonzero"><path d="M283.5 111.9a38.9 38.9 0 11-55 55 38.9 38.9 0 0155-55M283.5 228.5a38.9 38.9 0 11-55 55 38.9 38.9 0 0155-55M283.5 345.1a38.9 38.9 0 11-55 55 38.9 38.9 0 0155-55"></path></g>
            </svg>
            `;
            //<ul>
            nav.list.className = "nav-list";
            nav.list.innerHTML = `
            <li><i class="punch-line">Mixage, composition et formation audio...</i></li>
            <li class="buttons">
                <a href="./"><button tabindex="-1">Page principale</button></a>
                <a href="#"><button tabindex="-1">Services Podcasts</button></a>
                <a href="#"><button tabindex="-1">Nos productions</button></a>
                <a href="#"><button tabindex="-1">À propos</button></a>
                <a href="#"><button tabindex="-1">Contactez-nous</button></a>
            </li>
            <li class="main-logo" style="opacity: 0"><a href="./"><img src="../images/welcome-signature-logo.png" class="logo-link" alt="Logo"></a>© D Rocks Records 2020</li>
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
        const topNavBar = document.querySelector(".welcome.navbar");
        const content = document.querySelector(".content.shown");
        if (Nav.self.list.classList[1] !== "shown") {
            Nav.self.list.classList.add("shown");
            Nav.self.list.querySelector(".main-logo").style.opacity = "1";

            content.style.width = `calc(100vw - ${Nav.self.list.offsetWidth}px)`;
            topNavBar.style.opacity = `0`;
        } else {
            Nav.self.list.classList.remove("shown");
            Nav.self.list.querySelector(".main-logo").style.opacity = "0";

            content.style.width = "100vw";
            topNavBar.style.opacity = `1`;
        }
    }
}
