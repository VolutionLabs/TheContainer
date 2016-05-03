var bubbles = [];
var flowers = [];
var textSizeSlider;

var song;
var soundFormats;

//WEATHER
//A wind direction vector
var wind;
// Circle position
var position;
//own
var weather;
var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city = 'Berlin';
var apiKey = '&APPID=001b0f58045147663b1ea518d34d88b4';
var units = '&units=metric';

//ISS location

var lineX = 0;
var url = 'http://api.open-notify.org/iss-now.json';

var issX = 0;
var issY = 0;



function preload() {
    for (var i = 0; i< 3; i++){
        flowers[i] = loadImage("img/flower" + i + ".jpg"); 
    }
//    flowers[0] = loadImage("img/flower0.jpg");
//    flowers[1] = loadImage("img/flower1.jpg");
//    flowers[2] = loadImage("img/flower2.jpg");
    
    // AUDIO    
    // we have included both an .ogg file and an .mp3 file
    soundFormats('ogg', 'mp3');

    // if mp3 is not supported by this browser,
    // loadSound will load the ogg file
    // we have included with our sketch
    song = loadSound('audio/Jungle16004.mp3'); 
    
}


function setup() {
	var myCanvas = createCanvas(1200, 700);
	myCanvas.parent('myContainer2');
    
    // create a slider (min, max, default value)
    noFill();
    textSizeSlider = createSlider(10, 72, 36);
    textSizeSlider.position(55, 25);
    
    // song loaded during preload(), ready to play in setup()
    song.play();
    background(0,255,0);
    
//ISS    
	setInterval(askISS, 1000);
	//loadJSON(url, gotData);

//WEATHER
    // Request the data from openweathermap
    var url = api + city + apiKey + units;
    loadJSON(url, gotWeather);

    // Circle starts in the middle
    position = createVector(width/2, height/2);
    // wind starts as (0,0)
    wind = createVector();
    
    }

function mousePressed() {
    var r = floor(random(0, flowers.length));
    var b = new Bubble(mouseX, mouseY, flowers[r]);
    bubbles.push(b);
    
    //audio
    if ( song.isPlaying() ) { // .isPlaying() returns a boolean
        song.pause();
        background(255,0,0);
      } else {
        song.play(); // playback will resume from the pause position
        background(0,255,0);
      }
    
    
}


// ISS
function askISS(){
	loadJSON(url, gotData, 'jsonp');
}

function gotData(data){
	var lat = data.iss_position.latitude;
	var long = data.iss_position.longitude;
	issX = map(lat, 90, 90, 0, width);
	issY = map(long, 90, 90, 0, height);
	
}



function draw() {
    background(214);
    
    // ISS fill(255);
	ellipse(issX, issY, 24, 24);

	stroke(255);
	line(lineX, 0, lineX, height);
	lineX = lineX+5;
	if(lineX > width){
		lineX = 0;
	}

	
    
    //point
    stroke(255);
    point(width * 0.5, height * 0.5);
    point(width * 0.5, height * 0.25); 
    // line
    stroke(0, 153, 255);
    line(0, height*0.33, width, height*0.33);
    //rect
    stroke(255, 153, 0);
    rect(width*0.25, height*0.1, width * 0.5, height * 0.8);

    
    //bubbles
    for (var i = bubbles.length-1; i >= 0; i--) {
        bubbles[i].update();
        bubbles[i].display(); 
    }
    
    // display text
    noStroke();
    fill(100);
    textAlign(CENTER);
    textFont("Georgia");
    textSize(textSizeSlider.value()); 
    text("Size: " + textSizeSlider.value(), width/8, height/4); 
    
  //WEATHER
 // This section draws an arrow pointing in the direction of wind
    push();
    translate(32, height - 32);
    // Rotate by the wind's angle
    rotate(wind.heading() + PI/2);
    noStroke();
    fill(255);
    ellipse(0, 0, 48, 48);

    stroke(45, 123, 182);
    strokeWeight(3);
    line(0, -16, 0, 16);

    noStroke();
    fill(45, 123, 182);
    triangle(0, -18, -6, -10, 6, -10);
    pop();
    
    // Move in the wind's direction
    position.add(wind);
    
    stroke(0);
    fill(51);
    ellipse(position.x, position.y, 16, 16);

    if (position.x > width)  position.x = 0;
    if (position.x < 0)      position.x = width;
    if (position.y > height) position.y = 0;
    if (position.y < 0)      position.y = height;


    
}


function gotWeather(weather) {
	  
	  // Get the angle (convert to radians)
	  var angle = radians(Number(weather.wind.deg));
	  // Get the wind speed
	  var windmag = Number(weather.wind.speed);
	  
	  // Display as HTML elements
	  var temperatureDiv = createDiv(floor(weather.main.temp) + '&deg;');
	  var windDiv = createDiv("WIND " + windmag + " <small>MPH</small>");
	  var humidityDiv = createDiv("Humidity " + floor(weather.main.humidity));
	  var pressureDiv = createDiv("Pressure " + floor(weather.main.pressure));
	  var sunriseDiv = createDiv("Sunrise " + floor(weather.sys.sunrise))
	  var sunsetDiv = createDiv("Sunset " + floor(weather.sys.sunset))
	  // Make a vector
	  wind = p5.Vector.fromAngle(angle);
	}
