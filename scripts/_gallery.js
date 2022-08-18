const rightArrow = document.getElementById('gallery__arrow-right');
const leftArrow = document.getElementById('gallery__arrow-left');
const galleryItems = document.querySelectorAll('.gallery__item');
const dots = document.querySelectorAll('.gallery__dot');

rightArrow.addEventListener('click', rightMoveGallery);
leftArrow.addEventListener('click', leftMoveGallery);

function rightMoveGallery() {
    galleryItems.forEach((item, index, array) => {
        const orderStyle = Number(getComputedStyle(item).order);
        if (orderStyle < array.length - 1) {
            item.style.order = dots[index].style.order = (orderStyle + 1).toString();
        }
        if (orderStyle === array.length - 1) {
            item.style.order = dots[index].style.order = '0';
        }
    });
}

function leftMoveGallery() {
    galleryItems.forEach((item, index, array) => {
        Number(getComputedStyle(item).order) === 0 ?
            item.style.order = dots[index].style.order =
                (array.length - 1).toString() :
            item.style.order = dots[index].style.order =
                (Number(getComputedStyle(item).order) - 1).toString();
    })
}

