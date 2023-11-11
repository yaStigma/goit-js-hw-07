import { galleryItems } from './gallery-items.js';

const list = document.querySelector(".gallery");

list.insertAdjacentHTML("beforeend", createMarkup(galleryItems));
list.addEventListener("click", handleClick);

let instance = null;

function handleClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  }
    
  const currentGallery = event.target.closest(".gallery__item");
  const currentGalleryOriginal = currentGallery.querySelector("img").dataset.source;
  const gallery = galleryItems.find(({ original }) => original === currentGalleryOriginal);

  console.log(gallery);

  instance = basicLightbox.create(`
        <div class="modal">
            <img 
                src="${gallery.original}"
                alt="${gallery.description}"
                width="800">
        </div>
    `);
  
  instance.show();

  instance.element().addEventListener("click", handleCloseClick);
 
  instance.element().removeEventListener("close", handleModalClose);
}
function handleCloseClick() {
    instance.close();
}

function handleModalClose() {
    instance.element().removeEventListener("click", handleCloseClick);
    instance.off("close", handleModalClose);
}

function handleKeyDown(event) {
    if (event.key === "Escape") {
        instance.close(); 
    }
}

function createMarkup(arr) {
    return arr
        .map(
            ({ preview, original, description }) => `
            <li class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </li>
            `
        )
        .join("");
}

console.log(galleryItems);


