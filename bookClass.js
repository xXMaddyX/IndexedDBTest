export default class Book {
    constructor() {
        this.titel = null;
        this.author = null;
        this.isbn = null;
    };

    /**
     * @param {String} titel 
     * @param {String} author 
     * @param {String} isbn 
     * @returns {null | String}
     */
    setBookData = (titel, author, isbn) => {
        if (titel && author && isbn) {
            this.titel = titel;
            this.author = author;
            this.isbn = isbn;
        } else {
            return "Missing Data"
        };
    };

    /**
     * @returns {Object | String}
     */
    getBookData = () => {
        if (this.titel && this.author && this.isbn) {
            let bookObj = {
                titel: this.titel,
                author: this.author,
                isbn: this.isbn
            };
            return bookObj;
        } else {
            return "no book Data Found!!!"
        };
    };
    
    /**
     * @param {String} newtitel 
     * @param {String} newAuthor 
     * @param {String} newIsbn 
     * @returns {null | String}
     */
    changeData = (newtitel, newAuthor, newIsbn) => {
        if (newtitel && newAuthor && newIsbn) {
            this.titel = newtitel;
            this.author = newAuthor;
            this.isbn = newIsbn;
        } else {
            return "Data Missing, Input all info (Titel, Author, ISBN)";
        };
    };
};