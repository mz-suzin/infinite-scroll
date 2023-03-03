// DOM Manipulations
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Global Variables
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const apiKey = 'QLnuq11UDpTQswOGYbG8-GGBiiVEWrB9GIX6Y03mW_0';
const numberOfImages = 6;
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${numberOfImages}&orientation=landscape`;

// Helper Function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Check if all images were loaded on the screen
function imageLoaded() {
    if (imagesLoaded++ === totalImages - 1) {
        ready = true;
        loader.hidden = true;
    }
}

// Create elements for links & photos, and then add to DOM
function displayPhotos() {
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        img.addEventListener('load', imageLoaded());

        // put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log('Ooops, something wrong is not right', error);
    }
}

// Check if scrolling is near bottom of page, if yes, load more photos
window.addEventListener('scroll', () => {
    // window.innerHeight is constant, since it's the size of the showing screen
    // document.body.offsetHeight is also constant, only updating when something new is added to the page
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        imagesLoaded = 0;
        getPhotos();
    }
})

// On Load
getPhotos();