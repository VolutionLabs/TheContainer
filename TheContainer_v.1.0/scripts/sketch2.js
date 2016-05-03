//WEBGL

var particleCount = 300;
  var particles = [];
  var particleCounter = 0;
  var wind1 = 0;
  var wind2 = 0;
  var wind3 = 0;

var img;
var vid;
var theta = 0;

var song;
var soundFormats;


function preload() {    
    // AUDIO    
    // we have included both an .ogg file and an .mp3 file
    soundFormats('ogg', 'mp3');
    song = loadSound('audio/Jungle16004.mp3'); 
    
}

function setup(){
  //createCanvas(710, 400, WEBGL);
//	var myCanvas = createCanvas(710, 400, WEBGL);
	//myCanvas.parent('myContainer');
	
	var myCanvas = createCanvas(document.body.offsetWidth, document.body.offsetHeight, WEBGL);
	myCanvas.parent('myContainer');
	
	// createCanvas(document.body.offsetWidth, document.body.offsetHeight, WEBGL);
	 perspective(60 / 180 * PI, width/height, 0.1, 100);
	 colorMode(HSB,1)
	 
	  // song loaded during preload(), ready to play in setup()
    song.play();
    background(0,255,0);
	
  img = loadImage("img/222.jpg");
  vid = createVideo(["video/film_temp_xs.mp4"]);
  vid2 = createVideo(["http://online-sprengen.de/files/Toronto.mp4"]);
  vid.loop();
  vid.hide();
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




function draw(){
	
	
  background(250);
  background(.1);
  orbitControl();
  camera(0,0,500)
 
  //STRANGE PATTERN
  for(var i = 0; i < 500; i+=100){
	  push();
	  fill(i * 0.1, 100, 100);

	  //line
	  translate(0, 100, 0);
	  line(-100, 0, i, 100, 0, i);

	  //triangles
	  translate(0, 100, 0);
	  triangle(
	    0, sin( i + frameCount * 0.1) * 10, i, 
	    60, 60, i, 
	    -60, 60, i);

	  //quad
	  translate(0, 200, 0);
	  quad(
	    -100, i, 0,
	    100, i, 0,
	    -100, 100, i,
	    100, 100, i
	    );
	  pop();
	}
  //PATTERN END
  
  
   translate(-220,120,0);
  push();
    rotateZ(theta * mouseX * 0.001);
    rotateX(theta * mouseX * 0.001);
    rotateY(theta * mouseX * 0.001);
    
    //pass image as texture
    texture(vid2);
    sphere(250);
  pop();
    translate(440,40,120);
  push();
    rotateZ(theta * 0.1);
    rotateX(theta * 0.1);
    rotateY(theta * 0.1);

    
    texture(img);
    box(100, 100, 100);
  pop();
  theta += 0.05;
  
 //BOX2 VIDEO
  translate(-920,20,0);
  push();

    //pass image as texture
    texture(vid);
    box(250,250,250);
  pop();
}