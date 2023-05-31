// map declaration and configuration
map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.polygon([
  [
    69.287257,
    30.234375,
  ],
  [
    63.1543552,
    31.9921875,
  ],
  [
    56.0720355,
    30.234375,
  ],
  [
    48.3416462,
    40.2539063,
  ],
  [
    42.2935642,
    46.2304688,
  ],
  [
    50.9584267,
    49.3945313,
  ],
  [
    53.6446378,
    69.7851563,
  ],
  [
    50.2893393,
    86.484375,
  ],
  [
    53.5403074,
    125.15625,
  ],
  [
    45.0890356,
    133.9453125,
  ],
  [
    58.2632871,
    142.3828125,
  ],
  [
    60.6731786,
    172.6171875,
  ],
  [
    67.1358294,
    184.7460938,
  ],
  [
    71.6359929,
    141.5039063,
  ],
  [
    74.5433298,
    111.6210938,
  ],
  [
    76.9999351,
    104.9414063,
  ],
  [
    68.9741636,
    45.5273438,
  ],
  [
    69.4112424,
    30.9375,
  ]
], {
  color: 'red',
  fillColor: 'red'
}).addTo(map);

function addMarker(markerInfo) {
  const { name, longitude, latitude, description } = markerInfo;

  if (!isNaN(latitude) && !isNaN(longitude)) {
    const marker = L.marker({ lat: latitude, lng: longitude }).addTo(map);
    marker.bindPopup(`<b>${name}</b><br>${description}`);

    if (name === '404') {
      return;
    }

    marker.on('click', function () {
      map.flyTo(marker.getLatLng(), 10, {
        duration: 1.5,
        easeLinearity: 0.5
      });
    });
  }
};

// fetch data from database
const getPlaces = async () => {
  try {
    const response = await fetch('https://map-1zx6.onrender.com/');

    const data = await response.json();

    return data;
  } catch {
    const errorMessage = 'Something went wrong, please try to reload the page';
    setErrorMessage(errorMessage, 'add');
  }
};

const addPlace = async (newPlace) => {
  try {
    const data = await fetch('https://map-1zx6.onrender.com/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlace),
    })

    const place = await data.json();

    addMarker(place);
  } catch {
    const errorMessage = 'Something went wrong, please try again';
    setErrorMessage(errorMessage, 'add');
  }

};

(async () => {
  try {
    const places = await getPlaces();

    places.forEach(item => addMarker(item));
  } catch {
    const errorMessage = 'Something went wrong, please try to reload the page';
    setErrorMessage(errorMessage, 'add');
  }
})();

// form submit
const placeForm = document.querySelector('#form');

placeForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const placeName = document.querySelector('#name');
  const placeLongitude = document.querySelector('#longitude');
  const placeLatitude = document.querySelector('#latitude');
  const placeDescription = document.querySelector('#description');
  const isFormValidate = formValidator({
    name: placeName.value,
    longitude: +placeLongitude.value,
    latitude: +placeLatitude.value,
    description: placeDescription.value,
  });

  if (isFormValidate) {
    const newPlace = {
      name: placeName.value,
      longitude: placeLongitude.value,
      latitude: placeLatitude.value,
      description: placeDescription.value,
    };

    addPlace(newPlace);

    placeName.value = '';
    placeLongitude.value = '';
    placeLatitude.value = '';
    placeDescription.value = '';
  }
});

// utils
function setErrorMessage(errorMessage, action) {
  const error = document.querySelector('.error');

  if (action === 'remove') {
    errorMessage.style = "display:none";
    return;
  }

  if (action === 'add') {
    error.innerHTML = errorMessage;
    error.style = "display:block";
    return;
  }
};

function formValidator(formData) {
  const { name, longitude, latitude, description } = formData;
  const isLongitudeInRange = latitude <= 180 && latitude >= -180;
  const isLatitudeInRange = longitude <= 90 && longitude >= -90;
  const errorMessage = 'Будь ласка перевірте, широта або довгота має тільки цифри та вказано у даному форматі "40.23"';

  if (name && description && isLatitudeInRange && isLongitudeInRange) {
    setErrorMessage('', 'remove');
    return true;
  }

  setErrorMessage(errorMessage, 'add');

  return false;
};
