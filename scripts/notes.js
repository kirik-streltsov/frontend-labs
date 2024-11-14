let noteID = 1;
let count = 0;
let first = true;

sanitizeNote = (note) => {
    return note.replaceAll('  ', ' ').replaceAll('\n', ' ').trim();
};

removeNote = (id) => {
    console.log(id);
    let button = document.getElementById(id);
    let div = button.parentNode;
    let container = div.parentNode;

    let noteContentId = 'note-content-' + id.split('-')[1];
    let noteContent = sanitizeNote(document.getElementById(noteContentId).innerText);

    container.removeChild(div);

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let note = sanitizeNote(localStorage.getItem(key));
        
        if (note === noteContent) {
            localStorage.removeItem(key);
            break;
        }
    }
    count--;
    if (count == 0) {
        let form = document.getElementById('note-form');
        let deleteAllButton = document.getElementById('delete-all');
        form.removeChild(deleteAllButton);
        first = true;
    }
};

deleteAll = () => {
    let container = document.getElementById('notes-container');
    container.innerHTML = '';
    count = 0;
    let form = document.getElementById('note-form');
    let deleteAllButton = document.getElementById('delete-all');
    form.removeChild(deleteAllButton);
    localStorage.clear();
    first = true;
};

createNote = (text) => {
    let container = document.getElementById('notes-container');
    
    if (text === '') return;

    let template = document.getElementById('note-template');
    let element = document.createElement('div');
    element.append(template.content.cloneNode(true));
    element.addEventListener('animationend', () => {
        // removing '.added' class from all elements because id counter changes
        // and thus only the first node is the one who gets its class removed
        document.querySelectorAll(".added").forEach((it) => it.removeAttribute('class'));
    });
    element.setAttribute('class', 'added');
    element.setAttribute('id', 'note-' + noteID);
    element.querySelector('p').setAttribute('id', "note-content-" + noteID);
    element.querySelector('button').setAttribute('id', 'button-' + noteID);
    element.querySelector('p').innerText = text;
// 🗑️
    container.appendChild(element);

    document.getElementById('note-input').value = '';
    noteID++;
    count++;
    if (first) {
        let form = document.getElementById('note-form');
        let button = document.createElement('button');
        button.setAttribute('id', 'delete-all');
        button.addEventListener('click', () => deleteAll());
        button.innerText = 'Delete All';

        form.appendChild(button);
        first = false;
    } else if (count == 0) {
        let form = document.getElementById('note-form');
        let button = document.getElementById('delete-all');
        form.removeChild(button);
    }
};

createNoteFromForm = () => {
    let text = document.getElementById('note-input').value;
    createNote(text);
};

saveToLocalStorage = () => {
    let text = document.getElementById('note-input').value;
    if (text === '') return;
    createNote(text);
    localStorage.setItem((noteID - 1) + '', text);
    Toastify({
        text: "Saved note to local storage",
        duration: 3000,
        gravity: "bottom",
        style: {
            background: "#44b880",
        }
    }).showToast();
};

createNotesFromLocalStorage = () => {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let note = localStorage.getItem(key);
        createNote(note);
    }
};

document.addEventListener('DOMContentLoaded', createNotesFromLocalStorage());