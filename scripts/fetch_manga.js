let generateView = (link, imgSrc, mangaName) => {
    let template = document.getElementById('manga-template');
    let element = document.createElement('div');

    element.append(template.content.cloneNode(true));
    element.querySelector('a').setAttribute('href', link);
    element.querySelector('img').setAttribute('src', imgSrc);
    element.querySelector('span').innerText = mangaName;

    return element;
};

document.addEventListener('DOMContentLoaded', () => {
    const mangaGrid = document.getElementById('manga-grid');
    const loader = document.querySelector(".loader");
    let albumId = Math.floor(Math.random() * (10 - 1) + 1);
    fetch("https://jsonplaceholder.typicode.com/photos?albumId=" + albumId)
        .then(response => response.json())
        .catch(err => {
            loader.remove();
            Toastify({
                text: "Could not find any manga :(",
                duration: 3000,
                style: {
                    background: "#D80032",
                },
                gravity: "bottom",
            }).showToast();
            console.log(err);
        })
        .then(json => json.forEach(element => {
            let view = generateView(element["url"], element["thumbnailUrl"], element["title"]);
            mangaGrid.appendChild(view);
            loader.remove();
        }));
})