window.onload = () => {

    let items = {};

    /**
     * Set function of 'save' button to save a new note whose text was
     * contained in the text area
     */
    document.getElementById("save").onclick = () => {
        // get note content from textbox
        noteText = document.getElementById("textbox").value

        // get note title from titlebox
        noteTitle = document.getElementById("titlebox").value

        // add new note to notes
        items["notes"][noteTitle] = noteText;

        // save note to storage
        browser.storage.sync.set(items).then(() => {console.log("successfully set note")}, onError);

        // update note display
        updateNotesDisplay();
    }

    /**
     * Clears note area and adds all notes to the area
     */
    const updateNotesDisplay = () => {
        const notesDisplay = document.getElementById("savednotes");

        // clear notes display todo why isn't this working
        notesDisplay.innerHTML = "";

        // loop through notes, adding them as paragraphs in html
        const notes = items["notes"];
        for (const note in notes) {
            const notePara = document.createElement("p");
            notePara.innerText = note + " - " + notes[note];
            notesDisplay.append(notePara);
        }
    }

    /**
     * Set function of printnotes button to print out all notes to the console.
     */
    document.getElementById("printnotes").onclick = () => {
        browser.storage.sync.get().then(onGet, onError);
    }

    /**
     * Sets function of clear button to clear all notes from storage.
     */
    document.getElementById("clear").onclick = () => {
        browser.storage.sync.clear().then(updateNotesSync, onError);
    }

    /**
     * Callback function for initial synchronization of notes
     * @param elements contains all notes
     */
    const onInitialGet = (elements) => {
        items = elements;

        // if no notes have yet been created, initialize an empty object to notes
        if (items["notes"] === undefined) {
            items["notes"] = {};
        }

        // show all notes from sync
        updateNotesDisplay();
    }

    /**
     *
     */
    const updateNotesSync = () => {
        browser.storage.sync.get().then(onInitialGet, onError);
    }

    /**
     * Callback function for when an item is retrieved
     * @param item contains all notes
     */
    const onGet = (item) => {
        console.log(item);
    }

    /**
     * Callback function for when
     * @param message error message
     */
    const onError = (message) => {
        console.log("(PopupTesting) ERROR: " + message);
    }

    /**
     * The following is to be invoked when the window loads.
     */
    const afterload = () => {
        // sync notes from extension's storage
        updateNotesSync();
    }

    afterload();
}