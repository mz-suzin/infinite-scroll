// DOM Manipulations
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Global Variables
let photosArray = [];

// Unsplash API
const apiKey = 'QLnuq11UDpTQswOGYbG8-GGBiiVEWrB9GIX6Y03mW_0';
const numberOfImages = 4;
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${numberOfImages}&orientation=landscape`;

// Helper Function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create elements for links & photos, and then add to DOM
function displayPhotos() {
    photosArray.forEach((photo, index) => {
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
        console.log(photosArray);
        displayPhotos();
    } catch (error) {
        console.log('Ooops, something wrong is not right', error);
    }
}

// On Load
getPhotos();