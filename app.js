

const KeyboardTiels = document.querySelectorAll(".KeyboardTile");
const GridItems = document.querySelectorAll(".grid-item");

KeyboardTiels.forEach(tile => {
tile.addEventListener('click', function(){
    GridItems.forEach(item => {
        item.innerHTML=  tile.innerHTML;
    })
});
});