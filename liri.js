var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');
var fs = require('fs');
var bodyParser = require('body-parser');
var twitterkeys = require('./keys.js');

var command = process.argv[2];

// Command: node liri.js my-tweets
    // This will show your last 20 tweets and when they were created at in your terminal/bash window.
if(command === 'my-tweets') {
    var client = new Twitter(twitterkeys.twitterKeys);
    var params = {
        "screen_name": 'joelvanderhoof1',
        "count": '20'
    };

    client.get('statuses/user_timeline', params, function(err, tweets, response) {
        if(err) throw err;
        var count = 1;
        for (var i=tweets.length-1; i>=0; i--) {
            console.log("Tweet " + count + ":" + tweets[i].text); 
            count++;
        }
    });
}
// Command:  node liri.js spotify-this-song '<song and artist name here>'
    // This will show the following information about the song in your terminal/bash window
if(command === 'spotify-this-song') {
    var queryTrack = '';
    for (i=3; i<process.argv.length; i++){
        queryTrack += process.argv[i] + ' ';
    }
    console.log("queryTrack: " + queryTrack);
    // if no song is provided then your program will default to
    // "The Sign" by Ace of Base
    if(queryTrack=== '') {
        queryTrack = 'The Sign Ace of Base';
    }
    spotify.search({ type: 'track', query: queryTrack }, function(err, data) {
    if (err) {
        console.log('Error occurred: ' + err);
    }
    //console.log(data);
    // Artist(s)
    console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
    // The song's name
    console.log('Song title: ' + data.tracks.items[0].name);
    // A preview link of the song from Spotify
    console.log('Preview link: ' + data.tracks.items[0].preview_url);
    // The album that the song is from
    console.log('Album: ' + data.tracks.items[0].album.name);
    });
}



// Command:  node liri.js movie-this '<movie name here>'
    // This will output the following information to your terminal/bash window:
    //    * Title of the movie.
    //    * Year the movie came out.
    //    * IMDB Rating of the movie.
    //    * Country where the movie was produced.
    //    * Language of the movie.
    //    * Plot of the movie.
    //    * Actors in the movie.
    //    * Rotten Tomatoes URL.
    // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'


// Command:  node liri.js do-what-it-says
    // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
    // Feel free to change the text in that document to test out the feature for other commands.


// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
    // Make sure you append each command you run to the log.txt file.
    // Do not overwrite your file each time you run a command.