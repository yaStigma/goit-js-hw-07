import { galleryItems } from './gallery-items.js';
// Change code below this line
const list = document.querySelector(".gallery");
list.insertAdjacentHTML("beforeend", createMarkup(galleryItems));
list.addEventListener("click", handleClick);

function handleClick(event) {
    event.preventDefault();
    if (event.target === event.currentTarget) {
        return;
    }

  const imageURL = event.target.dataset.source;
  const imageAlt = event.target.getAttribute('alt');
  
 const images = [
    {
      src: imageURL,
      title: imageAlt,
    },
  ];

  new SimpleLightbox(images);


}


function createMarkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) => `
  <li class="gallery__item">
   <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
   </a>
</li>
    `
    )
    .join("");
}







console.log(galleryItems);
