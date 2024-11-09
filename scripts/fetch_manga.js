let generateView = (link, imgSrc, mangaName) => {
    let template = 
    `
    <div>
        <a href="${link}" class="manga-link">
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
            Toastify({
                text: "Could not find any manga :(",
                duration: 3000,
                style: {
                    background: "#D80032",
                },
                gravity: "bottom",
            }).showToast()
            console.log(err)
        })
        .then(json => json.slice(1, 17).forEach(element => {
            let view = generateView(element["url"], element["thumbnailUrl"], element["title"])
            mangaGrid.appendChild(view)
            loader.remove()
        }));
})