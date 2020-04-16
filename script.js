
// url = "https://opendata.arcgis.com/datasets/4a702cd67be24ae7ab8173423a768e1b_0.geojson"
url = "California_Power_Plants.geojson"

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



var gData
// d3.json(url).then(function (response) {

//   console.log(response)
// })

function init() {
  var select = d3.select("#selectNumber");
  d3.json(url).then(function (response) {
    gData = response
    var sampleNames = response.features
    sampleNames.forEach((sample) => {
      select
        .append("option")
        .text(sample.properties.General_Fuel)
        .property("value", sample.properties.General_Fuel);
    });
    //var initial=sampleNames[0]
    // buildMetaData(initial)
    //buildplots(initial);
    console.log("gData", gData)
  })

}

init()

function buildMetaData(data) {
  console.log(data)
}


var onlineyear
var energy_type
var MWproduction
var stationID

//////////////////////To do create a function that works with the map//////////////////////// using the gData

// d3.json(url).then(function (response) {
  L.geoJson(response, {
    onEachFeature: function (features, layer) {
      onlineyear = features.properties.Online_Year
      energy_type = features.properties.General_Fuel
      MWproduction = features.properties.MW
      stationID = features.properties.Plant_ID

      layer.bindPopup("Plant Label: " + features.properties.Plant_Label + "<br>");
    }
  }
  ).addTo(myMap)
  // Uncomment console.log to see data
  // console.log(response)
// });


// console.log("Goal: ", onlineyear)

// d3.json(url, function (response) {
//   L.geoJson(response, {
//     onEachFeature: function (feature, layer) {
//       console.log("feature:" , feature)
//       console.log("features-prop:" , features.properties)

//       onlineyear = feature.properties.Online_Year
//       energy_type = feature.properties.General_Fuel
//       MWproduction = feature.properties.MW
//       stationID = feature.properties.Plant_ID

//       console.log(onlineyear)


//     }
//   }


//   )

//   createBubblechart(onlineyear,MWproduction,energy_type)

// }







function createBubblechart(onlineyear, MWproduction, energy_type) {
  // console.log(onlineyear)
  // var stationIDcount = d3.nest()
  //   .key(function (d) { return d.Plant_ID; })
  //   .rollup(function (v) { return v.length; })
  //   .entries(features.properties);
  // // console.log(JSON.stringify(stationIDcount));

  // var MWproductionSum = d3.nest()
  //   .key(function (d) { return d.Plant_ID; })
  //   .rollup(function (v) { return v.sum; })
  //   .entries(features.properties);

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


  Plotly.newPlot("#bubble", trace2data, layout2);

};


// function createBubblechart() {
//   d3.json(url).then(function (response) {
//     L.geoJson(response, {
//       onEachFeature: function (features, layer) {
//         var onlineyear = features.properties.Online_Year;
//         var energy_type = features.properties.General_Fuel;
//         var MWproduction = features.properties.MW;
//         var stationID = features.properties.Plant_ID;
//         // console.log(onlineyear)

//         // Group by documentation http://learnjsdata.com/group_data.html

//         var stationIDcount = d3.nest()
//           .key(function (d) { return d.Plant_ID; })
//           .rollup(function (v) { return v.length; })
//           .entries(features.properties);
//         // console.log(JSON.stringify(stationIDcount));

//         var MWproductionSum = d3.nest()
//           .key(function (d) { return d.Plant_ID; })
//           .rollup(function (v) { return v.sum; })
//           .entries(features.properties);

//         var trace2 = {

//           x: onlineyear,
//           y: stationIDcount,
//           mode: "markers",
//           marker: {
//             size: MWproductionSum,
//             color: energy_type
//           }
//         };

//         var trace2data = [trace2]

//         var layout2 = {
//           title: "Historical Energy Production",
//           margin: { t: 0 },
//           hovermode: "closest",
//           xaxis: { title: "Online Year" },
//           margin: { t: 30 }
//         };


//         Plotly.newPlot("bubble", trace2data, layout2);

//       }
//     });
//   });
// }