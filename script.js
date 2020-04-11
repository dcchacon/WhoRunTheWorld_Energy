
url = "https://opendata.arcgis.com/datasets/4a702cd67be24ae7ab8173423a768e1b_0.geojson"

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

var onlineyear
var energy_type
var MWproduction
var stationID

// Grab geoJson data and create the map
d3.json(url, function (response) {
  L.geoJson(response, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup("Plant Label: " + feature.properties.Plant_Label + "<br>");
      // console.log(response)
      onlineyear = feature.properties.Online_Year;
      energy_type = feature.properties.General_Fuel;
      MWproduction = feature.properties.MW;
      stationID = feature.properties.Plant_ID;

      // var yticks = count(stationID).groupby(energy_type, onlineyear)
      // console.log(onlineyear)
    }


  }).addTo(myMap)
});

function createBubblechart(onlineyear, energy_type, MWproduction, stationID) {

  // L.geoJson(data, {
  //   onEachFeature: function (feature) {
  //     // var onlineyear = feature.properties.Online_Year;
  //     // var energy_type = feature.properties.General_Fuel;
  //     // var MWproduction = feature.properties.MW;
  //     // var stationID = feature.properties.Plant_ID;

  //     // var yticks = count(stationID).groupby(energy_type, onlineyear)

  //     console.log(data)
  //   }
  // })

  var trace2 = {

    x: onlineyear,
    y: MWproduction,
    mode: "markers",
    marker: {
      size: MWproduction,
      color: energy_type
    }
  };

  var trace2data = [trace2]

  var layout2 = {
    title: "Historical Energy Production",
    margin: { t: 0 },
    hovermode: "closest",
    xaxis: { title: "Online Year" },
    margin: { t: 30 }
  };


  Plotly.newPlot("bubble", trace2data, layout2);

};
createBubblechart(onlineyear, energy_type, MWproduction, stationID)
