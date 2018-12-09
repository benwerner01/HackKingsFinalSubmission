var zemba = function () {
}

var fs = require('fs');

var flights = [];

var json = []

var flightsContents = fs.readFileSync('flights.csv');
var flightsLines = flightsContents.toString().split('\n');
for (var i = 0; i < flightsLines.length; i++) {
  var object = {}
  object[flightsLines[i].toString().split(',')[0]] = {depAirport: flightsLines[i].toString().split(',')[1], depCity: flightsLines[i].toString().split(',')[2], destAirport: flightsLines[i].toString().split(',')[3], destCity: flightsLines[i].toString().split(',')[4], date: flightsLines[i].toString().split(',')[5], seats: []}
  json.push(object);
}
var prices = [];
var pricesContents = fs.readFileSync('seatavailability.csv');
var pricesLines = pricesContents.toString().split('\n');

for (let i = 0; i < pricesLines.length; i++) {
  for (let y = 0; y < flightsLines.length; y++) {
    if (Object.keys(json[y])[0] == pricesLines[i].toString().split(',')[0]) {
        json[y][Object.keys(json[y])[0]].seats.push({
        class: pricesLines[i].toString().split(',')[1],
        row: pricesLines[i].toString().split(',')[2],
        seatNumber: pricesLines[i].toString().split(',')[3],
        price: pricesLines[i].toString().split(',')[4]
      })
    };
  }
}
console.log(json)

var flightsFrom = [];
var flightsTo = [];
var flightsOn = [];
var pricesNew = [];

function addFlightNum(flights) {
  for (i = 0; i < flightsLines.length; i++) {
    console.log(flights[i][0]);
  }
}

function getFlightsFrom(depAirport, seatClass) {
  for (i = 0; i < flights.length; i++) {
    if (flights[i][2] == depAirport) {
      flightsFrom.push(flights[i][0]);
    }
  }
  for (let j = 0; j < prices.length; j++) {
    for (var i = 0; i < flightsFrom.length; i++) {
      if ((flightsFrom[i] == prices[j][0]) && (prices[j][1] == seatClass)) {
        pricesNew.push(prices[j])
      }
    }
  }
}

function getCheapest() {
  let minPriceSeat = pricesNew[0]; //first seat
  for (let j = 0; j < pricesNew.length; j++) {
      if (pricesNew[j][4] < minPriceSeat[4]) {
        minPriceSeat = pricesNew[j];
      }
  }
  console.log(minPriceSeat[0] + " : " + minPriceSeat[4]);
  removeFlightNumber(minPriceSeat);
}

function removeFlightNumber(flight) {
  let flightNum = flight[0];
  for (i = 0; i < pricesNew.length; i++) {
    if (pricesNew[i][0] == flightNum) {
      pricesNew.splice(pricesNew[i], 1);
    }
  }
}

function getTicket (depAirport, destAirport, userDate, seatClass) {
  // for (i = 0; i < flights.length; i++) {
  //   if (flights[i][2] == depAirport) {
  //     flightsFrom.push(flights[i]);
  //     //console.log("DepAirport " + flights[i]);
  //   }
  // }
  // for (i = 0; i < flightsFrom.length; i++) {
  //   if (flightsFrom[i][4] == destAirport) {
  //     flightsTo.push(flightsFrom[i]);
  //     //console.log("DestAirport " + flightsFrom[i]);
  //   }
  // }
  // for (i = 0; i < flightsTo.length; i++) {
  //   var date = flightsTo[i][5].substring(0, (flightsTo[i][5].length - 5));
  //   console.log(date)

  //   if (userDate == date) {
  //     flightsOn.push(flightsTo[i]);
  //     console.log("Date " + flightsTo[i]);
  //   }
  // }
  // for (j = 0; j < prices.length; j++) {
  //   for (var i = 0; i < flightsOn.length; i++) {
  //     if ((flightsOn[i] == prices[j][0]) && (prices[j][1] == seatClass)) {
  //       pricesNew.push(prices[j])
  //       console.log("Ticket " + prices[j]);
  //     } else {
  //       console.log("There are no flights matching this description.");
  //     }
  //   }
  // }
  return "This is a ticket"
}

//getFlightsFrom("Munich", "ECONOMY");
//getCheapest();
// getTicket('London', 'Paris', '03012019', 'BUSINESS');

module.exports = {
  getTicket: function(depAirport, destAirport, userDate, seatClass) {
    // for (i = 0; i < flights.length; i++) {
    //   if (flights[i][2] == depAirport) {
    //     flightsFrom.push(flights[i]);
    //     //console.log("DepAirport " + flights[i]);
    //   }
    // }
    // for (i = 0; i < flightsFrom.length; i++) {
    //   if (flightsFrom[i][4] == destAirport) {
    //     flightsTo.push(flightsFrom[i]);
    //     //console.log("DestAirport " + flightsFrom[i]);
    //   }
    // }
    // for (i = 0; i < flightsTo.length; i++) {
    //   var date = flightsTo[i][5].substring(0, (flightsTo[i][5].length - 5));
    //   console.log(date)

    //   if (userDate == date) {
    //     flightsOn.push(flightsTo[i]);
    //     console.log("Date " + flightsTo[i]);
    //   }
    // }
    // for (j = 0; j < prices.length; j++) {
    //   for (var i = 0; i < flightsOn.length; i++) {
    //     if ((flightsOn[i] == prices[j][0]) && (prices[j][1] == seatClass)) {
    //       pricesNew.push(prices[j])
    //       console.log("Ticket " + prices[j]);
    //     } else {
    //       console.log("There are no flights matching this description.");
    //     }
    //   }
    // }
    return "This is a ticket"
  }
}