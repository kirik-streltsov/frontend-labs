const currLocationItems = document.location.href.split('/')
console.log(document.location.href)
const currFile = currLocationItems[currLocationItems.length - 1]

const menuItems = document.getElementsByClassName('menu_item')

for (let item of menuItems) {
    console.log(item.className)
    if (item.getAttribute('href') == currFile) {
        item.classList.remove('menu_item')
        item.classList.add('menu_item_active')
        break
    } else if (currFile == 'https://kirik-streltsov.github.io/frontend-labs/') {
        let main = document.getElementById('main')
        main.classList.remove('menu_item')
        main.classList.add('menu_item_active')
    }
}