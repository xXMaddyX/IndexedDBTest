import GlobalData from "./singeltone.js";

class SubmitButton {
    static async submitData() {
        
    };
    /**
     * Takes the User Input and stors it in Cache
     * @param {HTMLElement} bookTitelInput 
     * @param {HTMLElement} bookAuthorInput 
     * @param {HTMLElement} bookISBNInput 
     */
    static getInputData(bookTitelInput, bookAuthorInput, bookISBNInput) {
        GlobalData.BOOK_CACHE = {
            bookTitel: bookTitelInput.value,
            bookAuthor: bookAuthorInput.value,
            bookISBN: bookISBNInput.value
        };
    };
};

class CancelButton {
    /**
     * Takes HTMLInputElement Array and reset its Input
     * @param {HTMLButtonElement} fields 
     */
    static resetFields(fields) {
        if (fields) {
            for (let i of fields) {
                i.value = "";
            };
        } else {
            console.warn("Input Fields not found");
        }
    };
};

export {
    SubmitButton,
    CancelButton
};