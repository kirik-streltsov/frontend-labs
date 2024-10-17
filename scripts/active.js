console.log(document.location.href);

const menuItems = document.getElementsByClassName('menu_item');
for (let item of menuItems) {
    console.log(item.className);
    if (item.href == document.location.href) {
        item.classList.remove('menu_item');
        item.classList.add('menu_item_active');
        break
    }
}