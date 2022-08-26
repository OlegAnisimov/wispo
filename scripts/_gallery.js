const rightArrow = document.getElementById('gallery__arrow-right');
const leftArrow = document.getElementById('gallery__arrow-left');
const galleryItems = document.querySelectorAll('.gallery__item');
const dots = document.querySelectorAll('.gallery__dot');

rightArrow.addEventListener('click', right);
leftArrow.addEventListener('click', left);

dots.forEach((item) => item.addEventListener('click', dotsMoving));


// localStorage.setItem('focusGalleryItem', '1'); // TEST
const focus = Number(localStorage.focusGalleryItem);

window.onload = () => {
    if (localStorage.focusGalleryItem) {
        if (focus === 0) return;
        do {
            galleryItems.forEach((item, index, array) => {
                if (Number(getComputedStyle(item).order) === array.length - 1) {
                    item.style.order = (0).toString();
                    item.setAttribute('focus', 'true');

                } else {
                    item.style.order = (Number(getComputedStyle(item).order) + 1).toString();
                    item.setAttribute('focus', 'true');
                }
            });
        } while (Number(getComputedStyle(galleryItems[focus]).order) !== 0);

        Array.from(galleryItems).filter((item, index, array) => Number(getComputedStyle(item).order) === array.length - 1).forEach((item) => {
            item.style.display = 'none';
            item.hidden = true;
        });


        Array.from(dots).filter((item) => getComputedStyle(item).order === '0').forEach((item) => {
            item.classList.remove('gallery__dot_active');
            item.classList.add('gallery__dot_active');
        });
        // localStorage.removeItem('focusGalleryItem');
    }
};

function right() {
    Array.from(galleryItems).filter((item) => item.attributes.focus).forEach((item) => item.removeAttribute('focus'));

    if (document.documentElement.clientWidth > 1366) {

        galleryItems.forEach((item, index, array) => {
                const orderStyleItem = Number(getComputedStyle(item).order);
                if (orderStyleItem === array.length - 1) {
                    item.style.order = '0';
                }
                if (orderStyleItem < array.length - 1) {
                    item.style.order = (orderStyleItem + 1).toString();
                }
                dotsAnimate();
            }
        );
    }

    if (document.documentElement.clientWidth <= 1366 &&
        document.documentElement.clientWidth > 375) {
        galleryItems.forEach((item, index, array) => {
                const orderStyleItem = Number(getComputedStyle(item).order);
                if (orderStyleItem === array.length - 1) {
                    item.style.order = '0';
                    item.style.display = 'flex';
                }
                if (orderStyleItem < array.length - 1) {
                    item.style.order = (orderStyleItem + 1).toString();
                    if (item.style.order === '3') item.style.display = 'none';
                }
                dotsAnimate();
            }
        );
    }

    Array.from(galleryItems).filter((item) => Number(getComputedStyle(item).order) === 0).forEach((item) => item.setAttribute('focus', 'true'));

    localStorage.setItem('focusGalleryItem',
        Array.from(galleryItems).find((item) => item.hasAttribute('focus')).getAttribute('id').slice(-1));
}

function left() {
    Array.from(galleryItems).filter((item) => item.attributes.focus).forEach((item) => item.removeAttribute('focus'));

    if (document.documentElement.clientWidth > 1366) {
        galleryItems.forEach((item, index, array) => {
            Number(getComputedStyle(item).order) === 0 ?
                item.style.order = (array.length - 1).toString() :
                item.style.order = (Number(getComputedStyle(item).order) - 1).toString();
        });
        dotsAnimate();
    }

    if (document.documentElement.clientWidth <= 1366 &&
        document.documentElement.clientWidth > 375) {
        galleryItems.forEach((item, index, array) => {
            if (Number(getComputedStyle(item).order) === 0) {
                item.style.order = (array.length - 1).toString();
            } else {
                item.style.order = (Number(getComputedStyle(item).order) - 1).toString();
            }
            Number(getComputedStyle(item).order) !== array.length - 1 ?
                item.style.display = 'flex' :
                item.style.display = 'none';
        });
        dotsAnimate();
    }

    Array.from(galleryItems).filter((item) => Number(getComputedStyle(item).order) === 0).forEach((item) => item.setAttribute('focus', 'true'));
}

function dotsMoving(event) {
    Array.from(galleryItems).forEach((item) => item.removeAttribute('focus'));
    const dotOrder = Number(getComputedStyle(event.target).order);
    for (let i = 0; i < galleryItems.length - dotOrder; i++) {
        right();
    }
    Array.from(galleryItems).filter((item) => Number(getComputedStyle(item).order) === 0).forEach((item) => item.setAttribute('focus', 'true'));
}

function dotsAnimate() {
    Array.from(dots).filter((item) => getComputedStyle(item).order === '0').forEach((item) => {
        item.classList.remove('gallery__dot_active');
        setTimeout(() => {
            item.classList.add('gallery__dot_active');
        }, 200);
    });
}
