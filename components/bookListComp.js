export default class BookElems extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: "open"});
    };

    async connectedCallback() {
        const rawText = await fetch("./components/bookListComp.html");
        this.shadow.innerHTML = await rawText.text();
        this.initEventListener();
        this.dispatchEvent(new CustomEvent("book-comp-ready", {bubbles: true, composed: true}));
    };

    generateBooks(books) {
        for (let book of books) {
            let container = document.createElement("div");
            container.classList.add("book");

            let titel = document.createElement("h3");
            titel.textContent = `Book Titel: ${book.titel}`;

            let author = document.createElement("h4");
            author.textContent = `Author: ${book.author}`;

            let isbn = document.createElement("p");
            isbn.textContent = `ISBN: ${book.isbn}`;

            container.append(titel, author, isbn);
            this.shadow.append(container);
        };
    };

    initEventListener() {
        this.addEventListener("send-book-data", (event) => {
            this.generateBooks(event.detail)
        });
    };
};