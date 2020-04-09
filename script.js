
url="https://opendata.arcgis.com/datasets/4a702cd67be24ae7ab8173423a768e1b_0.geojson"

var myMap = L.map("map", {
  center: [34.052235, -118.243683],
  zoom: 5
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

d3.json(url, function(response) {

 
  console.log(response)
  for (var i = 0; i < response.length; i++) {
    var location = response[i].location;


    if (location) {
      L.marker([location.coordinates[1], location.coordinates[0]]).addTo(myMap);
    }
  }

});
