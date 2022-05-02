function getCoord(array) {
  const newList = array.filter((item) => item.geocoded_column_1);
  return newList;
}

function markerPlace(array, map) {
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      layer.remove();
    }
  });
  array.forEach((restaurant, index) => {
    const {coordinates} = restaurant.geocoded_column_1;
    if (index === 0) {
      map.panTo([coordinates[1], coordinates[0]]);
    }

    L.marker([coordinates[1], coordinates[0]]).addTo(map);
  });
}

function initMap() {
  const map = L.map('map').setView([38.78, -76.87], 11);
  const accessToken = 'pk.eyJ1IjoiYXNoYWNoMTgiLCJhIjoiY2wycDRnYjRkMHlrOTNjbHhraTljczllYiJ9.7e1XirNmHBOnffCTpUwcSA';
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: accessToken
  }).addTo(map);
  return map;
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
  // The maximum is inclusive and the minimum is inclusive
}
function inject(array) {
  console.log(array, 'Oranges');
  const targetList = document.querySelector('.resto-list');
  targetList.innerHTML = '';
  array.forEach((item) => {
    const injectThisItem = `<li>${item.name}</li>`;
    targetList.innerHTML += injectThisItem;
  });
}

function dataHandler(dataArray) {
  console.log(dataArray.length);
  console.log('fired dataHandler');
  const range = [...Array(15).keys()];
  const listItems = range.map((m) => {
    const index = getRandomIntInclusive(0, dataArray.length - 1);
    return dataArray[index];
  });
  console.log(listItems, 'Apples');

  return listItems;
}

/*
  function createHtmlList(collection) {
    console.log('fired HTML creator');
    console.log(collection);
    const targetList = document.querySelector('.resto-list');
    targetList.innerHTML = '';
    collection.forEach((item) => {
      const injectThisItem = `<li>${item.name}</li>`;
      targetList.innerHTML += injectThisItem;
    });

  }
  */
async function mainEvent() {
  const map = initMap();
  const submit = document.querySelector('button[id="submit"]');
  const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  const arrayFromJson = await results.json();
  const restoName = document.querySelector('#name');
  const zip = document.querySelector('#food');
  // the async keyword means we can make API requests
  const form = document.querySelector('.main_form');
  let currArray = [];
  if (arrayFromJson.data.length > 0) {
    console.log(arrayFromJson);
    form.addEventListener('submit', async (submitEvent) => {
      submitEvent.preventDefault();
      console.log('form submission');
      // eslint-disable-next-line no-param-reassign
      submit.style.display = 'block';
      currArray = dataHandler(arrayFromJson.data);
      inject(currArray);
      console.log(currArray);
    });
    restoName.addEventListener('input', (event) => {
      if (!currArray.length) {
        return;
      }
      const restaurants = currArray.filter((item) => item.name.toLowerCase()
        .includes(event.target.value.toLowerCase()));
      const coord = getCoord(restaurants);
      inject(restaurants);
      markerPlace(coord, map);
    });
    zip.addEventListener('input', (event) => {
      if (!currArray.length) {
        return;
      }
      const restaurants = currArray.filter((item) => item.zip
        .includes(event.target.value));
      const coord = getCoord(restaurants);
      inject(restaurants);
      markerPlace(coord, map);
    });

    // this is called "dot notation"
    // arrayFromJson.data - we're accessing a key called 'data' on the returned object
    // it contains all 1,000 records we need
  }
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests