var Twit = require('twit');
var responses =
['Missionary sex is underrated!',
'Missionary position is loving and intimate',
'Missionary is a classic for a reason',
'missionary sex is actually very good',
'missionary is cool. not all sex has to be freaky to be good',
'missionary position is great for kissing your partner',
'missionary position is very comfortable for both parties',
'if you dont like missionary youre doing it wrong',
]

var T = new Twit({
  consumer_key: 'aMnxMOMJC17OqasOQD0ZmbQhI',
  consumer_secret: 'y5v9ip5WJzeyQn26UQNzOwzLPIIyinI52vVs9i8uiTsIm55lTo',
  access_token: '838196933403406336-2hIVo8sTFLgmu0XL4g8jkUuI8rgJwFw',
  access_token_secret: 'hXOJMs4evEDKlKEKsVpAqWtu4ODqeskhiWV2QdnYvY6xU'
})

//i dont remmeber why i did this
var tweeet = 'test';

//tracking terms
var stream = T.stream('statuses/filter', { track: ['missionary sex', 'missionary position'] })

//replying to mentions of those terms
stream.on('tweet', function (tweet) {
  console.log("@" + tweet.user.screen_name + " " + tweet.text)

  function newPost(tweeet) {      //function for a new post
    var nameID = tweet.id_str;    //the id for the tweet ya found

    //the actual post
    T.post('statuses/update', {in_reply_to_status_id: nameID, status: tweeet }, function(err, data, response) {
      if (err) {console.log(err); // logs an error if u get one
    }
      else {console.log(tweeet)}
  })
  }

//keeps bot from responding to itself
  if (tweet.user.screen_name !== "MissionaryRules"){
    var reply = "@" + tweet.user.screen_name + " " + responses[Math.floor(Math.random() * responses.length)]
    newPost(reply);}

//tweets from the array at an interval, not as a reply
})
setInterval(
  function newStatus() {
    T.post('statuses/update', { status: responses[Math.floor(Math.random() * responses.length)] }, function(err, data, response) {
    console.log(responses[Math.floor(Math.random() * responses.length)])
  })
  }
, 1000000);
