import GlobalData from "./singeltone.js";

export default class DbConnect {
    static async checkDB() {
        return new Promise((resolve, reject) => {
            // At Create the first time it need to set to 2 becouse the version change need to set
            const request = indexedDB.open(GlobalData.DB_NAME, 2);

            request.onupgradeneeded = () => {
                let db = request.result;
                if (!db.objectStoreNames.contains("books")) {
                    db.createObjectStore("books", {keyPath: "isbn"})
                    console.log("done")
                };
            };
            request.onsuccess = () => {
                let db = request.result;
                db.close()
                resolve("DB OK");
            };
            request.onerror = () => {
                reject(new Error("Database Error"));
            };
        });
    };

    static async loadAllBooks() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(GlobalData.DB_NAME);
            request.onsuccess = () => {
                let db = request.result;
                let bookData = db.transaction("books", "readonly").objectStore("books").getAll();
                bookData.onsuccess = () => {
                    resolve(bookData.result);
                };
                bookData.onerror = () => {
                    reject(new Error("Book List not found"));
                };
            };
            request.onerror = () => {
                reject(new Error("An error accured on loading Books"));
            };
        });
    };

    static async addBookToDb(book) {
        return new Promise((resolve, reject) => {
            const dbRequest = indexedDB.open(GlobalData.DB_NAME);
            dbRequest.onsuccess = () => {
                let db = dbRequest.result;
                let req = db.transaction("books", "readwrite").objectStore("books").add(book);

                req.onsuccess = () => {
                    resolve("Book addet to store");
                    db.close();
                };
                req.onerror = () => {
                    reject(new Error("error on transmitting Data"));
                    db.close();
                };
            };
            dbRequest.onerror = () => {
                reject(new Error("Error opening database"));
            };
        });
    };
};