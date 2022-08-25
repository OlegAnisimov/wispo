const rightArrow = document.getElementById('gallery__arrow-right');
const leftArrow = document.getElementById('gallery__arrow-left');
const galleryItems = document.querySelectorAll('.gallery__item');
const dots = document.querySelectorAll('.gallery__dot');
// let focusGalleryItem = galleryItems[0];

// rightArrow.addEventListener('click', rightMoveGallery);
rightArrow.addEventListener('click', right);
// leftArrow.addEventListener('click', leftMoveGallery);
leftArrow.addEventListener('click', left);

dots.forEach((item) => item.addEventListener('click', dotsMoving));


localStorage.setItem('focusGalleryItem', '1'); // TEST
const focus = Number(localStorage.focusGalleryItem);

window.onload = () => {
    if (localStorage.focusGalleryItem) {
        // SET GALLERY ITEMS
        // const focus = Number(localStorage.focusGalleryItem);
        if (focus === 0) return;
        dots.forEach((item) => item.classList.remove('gallery__dot_active'));

        do {
            galleryItems.forEach((item, index, array) => {
                if (Number(getComputedStyle(item).order) === array.length - 1) {
                    item.style.order = (0).toString();

                    dots[index].style.order = (0).toString();
                    if (dots[index].id.includes(focus)) {
                        dots[index].classList.add('gallery__dot_active')
                    }

                } else {
                    item.style.order = (Number(getComputedStyle(item).order) + 1).toString();

                    dots[index].style.order = (Number(getComputedStyle(item).order)).toString();
                    if (dots[index].id.includes(focus)) {
                        dots[index].classList.add('gallery__dot_active')
                    }
                }
            })
        } while (Number(getComputedStyle(galleryItems[focus]).order) !== 0);
        galleryItems[focus].setAttribute('focus', 'true');


        // localStorage.removeItem('focusGalleryItem');
    }
}

function rightMoveGallery() {
    if (document.documentElement.clientWidth > 1366) {
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

    focusGalleryItem = Array.from(galleryItems).filter((item) => getComputedStyle(item).order === '0')[0];
    // console.log(focusGalleryItem)
}

function leftMoveGallery() {
    console.log(galleryItems)
    galleryItems.forEach((item, index, array) => {
        Number(getComputedStyle(item).order) === 0 ?
            item.style.order = dots[index].style.order =
                (array.length - 1).toString() :
            item.style.order = dots[index].style.order =
                (Number(getComputedStyle(item).order) - 1).toString();
    })
}

function right() {
    Array.from(galleryItems).filter((item) => item.attributes.focus).forEach((item) => item.removeAttribute('focus'))
    dots.forEach((item) => item.classList.remove('gallery__dot_active'));
    if (document.documentElement.clientWidth > 1366) {

        const sortingDotsOrder = (a, b) => Number(a.style.order) - Number(b.style.order);
        const sortDotsOrder = (Array.from(dots)).sort(sortingDotsOrder);

        // sortDotsOrder.forEach((item, index, array) => )

        galleryItems.forEach((item, index, array) => {
                const orderStyle = Number(getComputedStyle(item).order);
                if (orderStyle === array.length - 1) {
                    item.style.order = '0';
                }
                if (orderStyle < array.length - 1) {
                    item.style.order = (orderStyle + 1).toString();
                }
            }
        );
    }

    Array.from(galleryItems).filter((item) => Number(getComputedStyle(item).order) === 0).forEach((item) => item.setAttribute('focus', 'true'));


}

function left() {
    console.log(localStorage.focusGalleryItem);
}

function dotsMoving(event) {


}

/*
* focus is attribute by the item
* need function on load page
*   which code will change css order to 0 for item.getAttribute('focus') if localStorage has focus attribute
* need function for left
* need function for right
* need function for dots
* */


