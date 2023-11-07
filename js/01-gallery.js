import { galleryItems } from './gallery-items.js';
// Change code below this line

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
      </div>
  `);

    instance.show();
    
    document.addEventListener("keydown", handleKeyDown);
}


function handleKeyDown(event) {
  if (event.key === "Escape") {
    instance.close(); 
  }
}

instance.on("visible", () => {
  document.addEventListener("keydown", handleKeyDown);
});

instance.on("hidden", () => {
  document.removeEventListener("keydown", handleKeyDown);
});




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
