/**
 * Words of Gandhi
 *
 * Source: https://github.com/carleson/Gandhi
 *
 * This is a simple quote appliaction with random Mahatma Gandhi quotes.
 * http://www.brainyquote.com/quotes/authors/m/mahatma_gandhi.html
 *
 */

/*
Pebble.addEventListener('ready', function() {
  console.log('PebbleKit JS ready!');
});

Pebble.addEventListener('showConfiguration', function() {
  var url = 'http://carleson.github.io/Pebble/Gandhi/index.html';
  console.log('Showing configuration page: ' + url);

  Pebble.openURL(url);
});

Pebble.addEventListener('webviewclosed', function(e) {
  var configData = JSON.parse(decodeURIComponent(e.response));
  console.log('Configuration page returned: ' + JSON.stringify(configData));

  var backgroundColor = configData['background_color'];

  var dict = {};
  if(configData['high_contrast'] === true) {
    dict['KEY_HIGH_CONTRAST'] = configData['high_contrast'] ? 1 : 0;  // Send a boolean as an integer
  } else {
    dict['KEY_COLOR_RED'] = parseInt(backgroundColor.substring(2, 4), 16);
    dict['KEY_COLOR_GREEN'] = parseInt(backgroundColor.substring(4, 6), 16);
    dict['KEY_COLOR_BLUE'] = parseInt(backgroundColor.substring(6), 16);
  }

  // Send to watchapp
  Pebble.sendAppMessage(dict, function() {
    console.log('Send successful: ' + JSON.stringify(dict));
  }, function() {
    console.log('Send failed!');
  });
});

*/
var UI = require('ui');
var Vector2 = require('vector2');
var Accel = require('ui/accel');
var Vibe = require('ui/vibe');
var Quotes = [
  "“Be the change you want to see in the world”",
  "“First they ignore you, then they laught at you, then they fight you, then you win”",
  "“Those who know how to think need no teachers”",
  "“There is more to life than increasing itś speed”",
  "”Where there is love there is life”",
  "”An eye for an eye will make the whole world blind”",
  "”Live as if you were to die tomorrow. Learn as if you were to live forever”",
  "”the best way to find yourself is to lose yourself in the service of others”",
  "”God has no religion”",
  "”Happiness is when what you think, what you say and what you do are in harmony”",
  "”Keep your thoughts positive - because your thoughts become your words”",
  "”Keep your words positive - because your words become your behavior”",
  "”Keep your behavior positive - because you behavior becomes your habits,”",
  "”Keep your habits positive - because your habits become your values”",
  "”Keep your values positive - because your values become your destiny”",
  "”Poverty is the worst form of violence”",
  "”Freedom is not worth having if it does not include the freedom to make mistakes”",
  "”Truth never damages a cause that is just”",
  "”It is health that is real wealth and not pieces of gold and silver”",
  "”My life is my message”",
  "”A nation's culture resides in the hearts and in the soul of its people”",
  "”If I had no sense of humor, I would long ago have committed suicide”",
  "”In a gentle way, you can shake the world”"
];
var Page = 0;
var wind = new UI.Window({ fullscreen: true });
var image = new UI.Image({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  image: 'images/Gandhi.png'
});

wind.add(image);
wind.show();

var main = new UI.Card({
  title: 'Gandhi',
  icon: 'images/Gandhi28.png',
  subtitle: '',
  scrollable: true,
  body: GetQuotes()
});

setTimeout(function() {
  // Display the mainScreen
  main.show();
  // Hide the splashScreen to avoid showing it when the user press Back.
  wind.hide();
}, 2000);

//main.show();

main.on('click', 'select', function(e) {
  main.body(GetQuotes());
  });

main.on('accelTap', function(e) {
   Vibe.vibrate('short');
   main.body(GetQuotes()); 
  });

function GetQuotes() {
  return Quotes[GetRandomPage()];
}

function GetRandomPage(){
  var number = 0;
  do {
       number = Math.floor((Math.random() * Quotes.length-1) + 1);
     }
  while (number == Page);
  Page = number;  
  return number;
}


// Prepare the accelerometer
Accel.init();


