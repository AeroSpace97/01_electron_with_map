const deps = [
  {
    type: 'css',
    url: 'https://api.mapbox.com/mapbox-gl-js/v3.5.1/mapbox-gl.css'
  },
  {
    type: 'js',
    url: 'https://api.mapbox.com/mapbox-gl-js/v3.5.1/mapbox-gl.js'
  }
]
const loadDeps = async (deps) => {
  for (const dep of deps) {
    if (dep.type === 'css') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = dep.url;
      document.head.appendChild(link);
    }
    if (dep.type === 'js') {
      const script = document.createElement('script');
      script.src = dep.url;
      document.head.appendChild(script);
      await new Promise((resolve) => {
        script.onload = resolve;
      });
    }
  }
}

function createMap() {
  const map = document.createElement('div');
  map.id = 'map';
  map.style.width = '100%';
  map.style.height = '100vh';
  document.body.append(map);
  return map;
}

function initMap() {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYXJjaGl0ZWN0Z3VhbiIsImEiOiJja200dmV2aHIwN2IyMnBxdGZ4bHFiaHc1In0.QAIUvcxoYsFO0CU5RlAdRA';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });


  window['mapboxgl'] = mapboxgl;
  window.map = map;
}


loadDeps(deps).then(() => {
  createMap();
  initMap();
});