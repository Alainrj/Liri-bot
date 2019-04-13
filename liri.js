require("dotenv").config();
//Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret,
});
// var defaultSong = require("The Sign");
var defaultMovie = "Mr. Nobody";
// var spotify = new Spotify(keys.spotify);

// <---------------------------------------------------->

/**
 * Name of the venue
Venue location
Date of the Event (use moment to format this as "MM/DD/YYYY")
 */
var action = process.argv[2];
var value = process.argv[3];

switch (action) {
  case "concert-this":
    getBands(value)
    break;
  case "spotify-this-song":
    //If user has not specified a song , use default
    // if (value === "") {
    //   value = defaultSong;
    // }
    getSongs(value)
    break;
  case "movie-this":
    //If user has not specified a movie , use default
    if (value == "") {
      value = defaultMovie;
    }
    movieThis(value)
    break;
  case "do-what-it-says":
    doWhatItSays()
    break;
  default:
    break;
}

// <---------------------------------------------------->


function getBands(artist) {
  // var artist = value;
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function (response) {
      console.log("Name of the venue:", response.data[0].venue.name);
      console.log("Venue location:", response.data[0].venue.city);
      var eventDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
      console.log("Date of the Event:", eventDate);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// <---------------------------------------------------->


function getSongs(songName) {
  // var songName = value;

  //If user has not specified a song , default to "The Sign" by Ace of Bass
  if (songName === "") {
    songName = "I Saw the Sign";
  }

  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    // else {
    //   console.log("Not right now. Later?")

    // console.log(JSON.stringify(data)); 

    // The song's name

    //Artist(s)
    console.log("Artists: ", data.tracks.items[0].album.artists[0].name)
    // A preview link of the song from Spotify
    console.log("Preview Link: ", data.tracks.items[0].preview_url)
    // The album that the song is from
    console.log("Album Name: ", data.tracks.items[0].album.name)
  });
}
// <---------------------------------------------------->

function movieThis(movie) {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=trilogy").then(
        function(response) {
            //console.log(response.data);
            if (response.data.Title != undefined) {
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("imdbRating:: " + response.data.imdbRating);
                console.log("Title: " + response.data.Title);
                console.log("Country:: " + response.data.Country);
                console.log("Language:: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("RottenTomatoes: " + response.data.tomatoRating);
            } 
            else {
                movieThis("Mr. Nobody");
            }
        }
        // if response is empty call the api again with the "default" movie 
    ).catch(function (error) {  
        console.log(error);
        console.log("No Results found. ");
  });
}

// <---------------------------------------------------->


function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    data = data.split(",");
    var action = data[0]
    var value = data[1]
    // getSongs(value)
    switch (action) {
      case "concert-this":
        getBands(value)
        break;
      case "spotify-this-song":
        getSongs(value)
        break;
      case "movie-this":
        getMovies(value)
        break;
      default:
        break;
    }
  });
}