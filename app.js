import Book from "./bookClass.js";
import DbConnect from "./ConnectDB.js";
import GlobalData from "./singeltone.js";
import BookElems from "./components/bookListComp.js";
import { CancelButton, SubmitButton } from "./appListenerClasses.js";

const bookTitelInput = document.querySelector("#book-titel");
const bookAuthorInput = document.querySelector("#book-author");
const bookISBNInput = document.querySelector("#book-isbn");
const submitDataButton = document.querySelector("#send-btn");
const cancelButton = document.querySelector("#cancel-btn");
const bookSection = document.querySelector("#book-section");

customElements.define("book-elems", BookElems);

document.addEventListener("DOMContentLoaded", async () => {
    initListeners();
    /**@type {IDBDatabase}*/
    await DbConnect.checkDB();

    /**@type {IDBRequest<any[]>}*/
    let books = await DbConnect.loadAllBooks();
    bookSection.innerHTML = "";

    const bookElem = document.createElement("book-elems");
    bookSection.append(bookElem);

    initEventListenerForBooks(bookElem, books);
});

/**
 * @param {HTMLButtonElement} submitDataButton 
 * @param {HTMLButtonElement} cancelButton
 */
const initListeners = () => {
    submitDataButton.addEventListener("click", async () => {
        SubmitButton.getInputData(bookTitelInput, bookAuthorInput, bookISBNInput);
        /** @type {Book}*/
        let book = generateBook();
        let bookData = {
            titel: book.titel,
            author: book.author,
            isbn: book.isbn
        };
        await DbConnect.addBookToDb(bookData);
        CancelButton.resetFields([bookTitelInput, bookAuthorInput, bookISBNInput]);
        reloadBooks();
    });

    cancelButton.addEventListener("click", () => {
        CancelButton.resetFields([bookTitelInput, bookAuthorInput, bookISBNInput]);
    });
};

/**@returns {Book}*/
const generateBook = () => {
    let newBook = new Book();
    newBook.setBookData(GlobalData.BOOK_CACHE.bookTitel, GlobalData.BOOK_CACHE.bookAuthor, GlobalData.BOOK_CACHE.bookISBN);
    GlobalData.BOOK_POOL.push(newBook);
    return newBook;
};

/**
 * @param {HTMLElement} bookElem 
 * @param {IDBRequest<any[]>} books 
 */
const initEventListenerForBooks = (bookElem, books) => {
    document.addEventListener("book-comp-ready", () => {
        bookElem.dispatchEvent(new CustomEvent("send-book-data", {
            detail: books,
            bubbles: true,
            composed: true
        }));
    });
};

const reloadBooks = async () => {
    /**@type {IDBRequest<any[]>}*/
    let books = await DbConnect.loadAllBooks();
    bookSection.innerHTML = "";

    const bookElem = document.createElement("book-elems");
    bookSection.append(bookElem);

    initEventListenerForBooks(bookElem, books);
};