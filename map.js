(function () {
    const myMap = L.map("map").setView([51.505, -0.09], 13);
  
    L.tileLayer(
      "https://api.maptiler.com/maps/pastel/{z}/{x}/{y}.png?key=g4cnCqJpVwWuIu1TVAnh",
      {
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        attribution:
          '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
        crossOrigin: true,
      }
    ).addTo(myMap);
  
    fetch("/map.csv")
      .then(res => res.text())
      .then(csvText => {
        
      })
  })();