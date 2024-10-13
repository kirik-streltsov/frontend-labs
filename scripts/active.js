const currLocationItems = document.location.href.split('/')
const currFile = currLocationItems[currLocationItems.length - 1]

const menuItems = document.getElementsByClassName('menu_item')

for (let item of menuItems) {
    console.log(item.className)
    if (item.getAttribute('href') == currFile) {
        item.classList.remove('menu_item')
        item.classList.add('menu_item_active')
        break
    }
}