let generateView = (imgSrc, mangaName) => {
    let template = 
    `
    <div>
        <a href="#">
            <img src="${imgSrc}" alt="Manga">
            <div class="span-container">
                <span>${mangaName}</span>
            </div>
        </a>
    </div>
    `

    let element = document.createElement('div')
    element.innerHTML = template

    return element
}

document.addEventListener('DOMContentLoaded', () => {
    const mangaGrid = document.getElementById('manga-grid')
    const loader = document.querySelector(".loader")
    fetch("https://jsonplaceholder.typicode.com/photos")
        .then(response => response.json())
        .catch(err => {
            loader.remove()
            mangaGrid.style.display = 'flex'
            mangaGrid.innerHTML = '<p style="color: white; font-weight: 500; justify-self: center">Could not find any manga :(</p>'
            console.log(err)
        })
        .then(json => json.slice(1, 17).forEach(element => {
            let view = generateView(element["thumbnailUrl"], element["title"])
            mangaGrid.appendChild(view)
            loader.remove()
        }));
})