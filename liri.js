require("dotenv").config();

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var Twitter = require('twitter');
var keys =  require("./keys.js");
var client = new Twitter(keys.twitter);
var command = process.argv[2];


process.argv.shift()// skip node
process.argv.shift()// skip file
process.argv.shift()// skip argv[2]
var commandData = process.argv.join(" ");

console.log(commandData)

 
var tweets = () => {

var params = {
  screen_name: 'wsj', 
  count: 21
};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {

    for (var i = 0; i < tweets.length; i++){
      console.log("===========================================");
      console.log("TWEET: " + i);
      console.log("TWEETS: " + tweets[i].text);
      console.log("===========================================");

    }
  }
});
}
// tweets();

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify(keys.spotify);

// 
//Function for getting spotify songs
function spotifyIt(commandData) {
  if (commandData) { //if a song is put named in 4th paramater go to function
      var songName = commandData;
  } else { //if blank call it "The Sign" by Ace of Base // 
      songName = "one";
  }
  spotify.search({
      type: 'track',
      query: songName
  }, function(err, data) {
      if (err) {
          console.log('Error occurred: ' + err);
          return; //from spotify npm docs
      } else {
          var songInfo = data.tracks.items[0];
          var songResult = console.log(songInfo.artists[0].name)
          console.log(songInfo.name)
          console.log(songInfo.album.name)
          console.log(songInfo.preview_url)
              /*console.log(songResult);*/
      };
  });
}
  switch(command){
    case "my-tweets":
    tweets();
    break;
    case "spotify":
    spotifyIt(commandData);
    break;
  }