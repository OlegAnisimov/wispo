const rightArrow = document.getElementById('gallery__arrow-right');
const leftArrow = document.getElementById('gallery__arrow-left');
rightArrow.addEventListener('click', rightMoveGallery);
leftArrow.addEventListener('click', leftMoveGallery);

function rightMoveGallery() {
    const galleryItems = document.getElementsByClassName('gallery__item');
    for (let i = 0; i < galleryItems.length; i++) {
        const currentOrder = Number(getComputedStyle(galleryItems[i]).order);
        if (currentOrder < galleryItems.length - 1) {
            galleryItems[i].style.order = (currentOrder + 1).toString();
        }
        if (currentOrder === galleryItems.length - 1) {
            galleryItems[i].style.order = '0';
        }
    }
}

function leftMoveGallery() {
    const galleryItems = document.getElementsByClassName('gallery__item');
    for (let i = 0; i < galleryItems.length; i++) {
        const currentOrder = Number(getComputedStyle(galleryItems[i]).order);
        currentOrder === 0 ?
            galleryItems[i].style.order = (galleryItems.length - 1).toString() :
            galleryItems[i].style.order = (currentOrder - 1).toString();
    }
}
