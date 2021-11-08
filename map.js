(function () {
  const myMap = L.map("map").setView([51.505, -0.09], 13);

  L.tileLayer(
    // "https://api.maptiler.com/maps/pastel/{z}/{x}/{y}.png?key=g4cnCqJpVwWuIu1TVAnh",
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      attribution:
        '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
      crossOrigin: true,
    }
  ).addTo(myMap);

  fetch("/locations.json")
    .then(response => response.json())
    .then((data) =>
      Papa.parse(csvText, {
        header: true,
      })
    )
    .then((jsonObj)=>{return jsonObj.data.filter((element)=>{
      return element.hasOwnProperty("Lat") && element.hasOwnProperty("Long");
    })})
    .then((points) =>
      points.map((element) => {
        const circle = L.circle([element.Lat, element.Long], {
          color: element.Activeness === "Yes" ? "red" : "blue",
          radius: 50000,
        });
        circle.bindPopup(element.Manufacturer);
        return circle;
      })
    )

    .then((leafletCircles) =>
      leafletCircles.forEach((circle) => circle.addTo(myMap))
    );
})();
