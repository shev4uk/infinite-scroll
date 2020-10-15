// #3
const url = 'https://pixabay.com/api/?key=16812386-9ea8e062917dc634f468763c4';
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('#gallery');
const inputQuery = document.querySelector('.input-query');
let page = 1;
searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  infiniteScroll();
});

async function getImages() {
  const query = inputQuery.value;
  await fetch(`${url}&q=${query}&page=${page}`)
    .then(res => res.json())
    .then(images => {
      images.hits.forEach(image => {
        gallery.insertAdjacentHTML('beforeend', `<li>
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}">
        </a>
      </li>`)
      });
      page++;
    });
}

function infiniteScroll() {
  const options = {
    threshold: 1
  }
  observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        getImages();
      } 
    });
  }, options);
  observer.observe(document.querySelector('#trigger'));
}
