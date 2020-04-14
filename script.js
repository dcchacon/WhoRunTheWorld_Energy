
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
// // d3.json(url).then(function (response) {
//   L.geoJson(response, {
//     onEachFeature: function (features, layer) {
//       layer.bindPopup("Plant Label: " + features.properties.Plant_Label + "<br>");
//       // Uncomment console.log to see data
//       console.log(response)
//     }
//   }).addTo(myMap)
// // });

d3.json(url).then(function (response) {
  L.geoJson(response, {
    onEachFeature: function (features, layer) {
      layer.bindPopup("Plant Label: " + features.properties.Plant_Label + "<br>");
       
    }
    
  }).addTo(myMap)
  // Uncomment console.log to see data
  console.log(response)
});



function createBubblechart() {
  d3.json(url).then(function (response) {
    L.geoJson(response, {
      onEachFeature: function (features, layer) {
        var onlineyear = features.properties.Online_Year;
        var energy_type = features.properties.General_Fuel;
        var MWproduction = features.properties.MW;
        var stationID = features.properties.Plant_ID;
        // console.log(onlineyear)
      
        // Group by documentation http://learnjsdata.com/group_data.html

        var stationIDcount = d3.nest()
          .key(function (d) { return d.Plant_ID; })
          .rollup(function (v) { return v.length; })
          .entries(features.properties);
        // console.log(JSON.stringify(stationIDcount));

        var MWproductionSum = d3.nest()
          .key(function (d) { return d.Plant_ID; })
          .rollup(function (v) { return v.sum; })
          .entries(features.properties);

        var trace2 = {

          x: onlineyear,
          y: stationIDcount,
          mode: "markers",
          marker: {
            size: MWproductionSum,
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

      }
    });
  });
}
createBubblechart()