let noteID = 1
let count = 0
let first = true

sanitizeNote = (note) => {
    return note.replaceAll('  ', ' ').replaceAll('\n', ' ').trim()
}

removeNote = (id) => {
    console.log(id)
    let button = document.getElementById(id)
    let div = button.parentNode
    let container = div.parentNode

    let noteContentId = 'note-content-' + id.split('-')[1]
    let noteContent = sanitizeNote(document.getElementById(noteContentId).innerText)

    container.removeChild(div)

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        let note = sanitizeNote(localStorage.getItem(key))
        console.log(note)
        console.log(noteContent)
        console.log(note === noteContent)
        if (note === noteContent) {
            console.log('must have deleted')
            localStorage.removeItem(key)
            break
        }
    }
    count--
    if (count == 0) {
        let form = document.getElementById('note-form')
        let deleteAllButton = document.getElementById('delete-all')
        form.removeChild(deleteAllButton)
        first = true
    }
}

deleteAll = () => {
    let container = document.getElementById('notes-container')
    container.innerHTML = ''
    count = 0
    let form = document.getElementById('note-form')
    let deleteAllButton = document.getElementById('delete-all')
    form.removeChild(deleteAllButton)
    localStorage.clear()
    first = true
}

createNote = (text) => {
    let container = document.getElementById('notes-container')
    
    if (text == '') return

    let template = 
    `
    <div id="note-${noteID}" class="added">
        <p id="note-content-${noteID}">${text}</p>
        <button id="button-${noteID}" onclick=removeNote(this.id)>🗑️</button>
    </div>
    `
// 🗑️
    container.innerHTML = template + container.innerHTML
    
    let createdNote = document.getElementById(`note-${noteID}`)
    createdNote.addEventListener('animationend', () => {
        // removing '.added' class from all elements because id counter changes
        // and thus only the first node is the one who gets its class removed
        document.querySelectorAll(".added").forEach((it) => it.removeAttribute('class'))
    })

    document.getElementById('note-input').value = ''
    noteID++
    count++
    if (first) {
        let form = document.getElementById('note-form')
        let template = 
        `
        <button id="delete-all" onclick=deleteAll()>Delete All</button>
        `

        form.innerHTML += template
        first = false
    } else if (count == 0) {
        let form = document.getElementById('note-form')
        let button = document.getElementById('delete-all')
        form.removeChild(button)
    }
}

createNoteFromForm = () => {
    let text = document.getElementById('note-input').value
    createNote(text)
}

saveToLocalStorage = () => {
    let text = document.getElementById('note-input').value
    createNote(text)
    localStorage.setItem((noteID - 1) + '', text)
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        let note = localStorage.getItem(key)
        console.log(note)
    }
}

createNotesFromLocalStorage = () => {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        let note = localStorage.getItem(key)
        createNote(note)
    }
}

document.addEventListener('DOMContentLoaded', createNotesFromLocalStorage())