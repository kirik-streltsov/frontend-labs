let noteID = 1
let count = 0
let first = true

removeNote = (id) => {
    console.log(id)
    let button = document.getElementById(id)
    let div = button.parentNode
    let container = div.parentNode
    container.removeChild(div)
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
    first = true
}

createNote = () => {
    let note = document.getElementById('note-input').value
    let container = document.getElementById('notes-container')
    
    if (note == '') return

    let template = 
    `
    <div id="note-${noteID}">
        <p>${note}</p>
        <button id="button-${noteID}" onclick=removeNote(this.id)>🗑️</button>
    </div>
    `
// 🗑️
    container.innerHTML = template + container.innerHTML
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